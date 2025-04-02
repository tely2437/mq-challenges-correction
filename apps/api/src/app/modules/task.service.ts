import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Raw, Repository } from 'typeorm'
import { TaskEntity } from './task.entity'
import { GetTasksDto } from './task.dto'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  public async getAll(input?: GetTasksDto): Promise<TaskEntity[]> {
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

    return this.taskRepository.find(options)
  }

  public async getById(id: string): Promise<TaskEntity | null> {
    return this.taskRepository.findOne({ where: { id } })
  }

  public async create(task: Omit<TaskEntity, 'id'>): Promise<TaskEntity> {
    const newTask = this.taskRepository.create(task)
    return this.taskRepository.save(newTask)
  }

  public async update(id: string, task: Partial<Omit<TaskEntity, 'id'>>): Promise<TaskEntity> {
    const previousTask = await this.taskRepository.findOne({ where: { id } })
    if (!previousTask) {
      throw new Error(`Task with id ${id} not found`)
    }

    const newTask = this.taskRepository.create({ ...previousTask, ...task })
    await this.taskRepository.update(id, newTask)

    return newTask
  }

  public async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id)
  }
}
