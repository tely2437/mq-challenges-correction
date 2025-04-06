import { Injectable, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Raw, In } from 'typeorm'
import { Task } from './entities/task.entity'
import { GetTasksDto } from './dto/tasks-filters.dto'
import { PaginatedTasksDto } from './dto/paginated-tasks.dto'
import { PermissionsEnum } from './entities/permissions.entity'


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  private checkPermissions(task: Task, action: PermissionsEnum): boolean {
    switch (action) {
      case PermissionsEnum.READ:
        return task.canRead ?? false
      case PermissionsEnum.EDIT:
        return task.canEdit ?? false
      case PermissionsEnum.DELETE:
        return task.canDelete ?? false
      default:
        return false
    }
  }

  public async getAll(input?: GetTasksDto): Promise<PaginatedTasksDto> {
    const options = input
      ? {
          where: {
            ...(input.search
              ? {
                  title: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:search)`, {
                    search: `%${input.search}%`,
                  }),
                }
              : {}),
          },
          skip: input.skip ?? undefined,
          take: input.take ?? undefined,
        }
      : undefined

    const [items, total] = await this.taskRepository.findAndCount(options)
    return {
      items,
      total,
    }
  }

  public async getById(id: string): Promise<Task | null> {
    const task = await this.taskRepository.findOne({ where: { id } })
    if (!task) {
      return null
    }
    
    this.checkPermissions(task, PermissionsEnum.READ)
    return task
  }

  public async create(task: Omit<Task, 'id'>): Promise<Task> {
    const newTask = this.taskRepository.create(task)
    return this.taskRepository.save(newTask)
  }

  public async createMany(tasks: Omit<Task, 'id'>[]): Promise<Task[]> {
    const newTasks = this.taskRepository.create(tasks)
    return this.taskRepository.save(newTasks)
  }

  public async update(id: string, task: Partial<Omit<Task, 'id'>>): Promise<Task> {
    const previousTask = await this.taskRepository.findOne({ where: { id } })
    if (!previousTask) {
      throw new Error(`Task with id ${id} not found`)
    }
    if (!this.checkPermissions(previousTask, PermissionsEnum.EDIT)) {
      throw new ForbiddenException(`Vous n'avez pas la permission de modifier la tâche ${previousTask.id}`)
    }

    const newTask = this.taskRepository.create({ ...previousTask, ...task })
    await this.taskRepository.update(id, newTask)

    return newTask
  }

  public async updateMany(updates: { id: string; data: Partial<Omit<Task, 'id'>> }[]): Promise<Task[]> {
    const tasks = await this.taskRepository.findBy({ id: In(updates.map(u => u.id)) })
    
    // Vérifier les permissions d'édition pour toutes les tâches
    tasks.forEach(task => {
      if (!this.checkPermissions(task, PermissionsEnum.EDIT)) {
        throw new ForbiddenException(`Vous n'avez pas la permission de modifier la tâche ${task.id}`)
      }
    })

    const updatedTasks = tasks.map(task => {
      const update = updates.find(u => u.id === task.id)
      return this.taskRepository.create({ ...task, ...update?.data })
    })

    await this.taskRepository.save(updatedTasks)
    return updatedTasks
  }

  public async delete(id: string): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id } })
    if (!task) {
      throw new Error(`Task with id ${id} not found`)
    }

    if (!this.checkPermissions(task, PermissionsEnum.DELETE)) {
      throw new ForbiddenException(`Vous n'avez pas la permission de supprimer la tâche ${task.id}`)
    }
    await this.taskRepository.delete(id)
  }

  public async deleteMany(ids: string[]): Promise<void> {
    const tasks = await this.taskRepository.findBy({ id: In(ids) })
    
    // Vérifier les permissions de suppression pour toutes les tâches
    tasks.forEach(task => {
      if (!this.checkPermissions(task, PermissionsEnum.DELETE)) {
        throw new ForbiddenException(`Vous n'avez pas la permission de supprimer la tâche ${task.id}`)
      }
    })

    await this.taskRepository.delete(ids)
  }
}
