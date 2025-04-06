import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Task } from './entities/task.entity'
import { GetTasksDto } from './dto/tasks-filters.dto'
import { PaginatedTasksDto } from './dto/paginated-tasks.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'
import { UpdateManyTasksDto } from './dto/update-many-tasks.dto'

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les tâches' })
  @ApiResponse({ status: 200, description: 'Liste des tâches', type: PaginatedTasksDto })
  findAll(@Query() filters?: GetTasksDto): Promise<PaginatedTasksDto> {
    return this.tasksService.getAll(filters)
  }

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle tâche' })
  @ApiBody({ type: Task })
  @ApiResponse({ status: 201, description: 'Tâche créée', type: Task })
  create(@Body() task: Omit<Task, 'id'>): Promise<Task> {
    return this.tasksService.create(task)
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Créer plusieurs tâches' })
  @ApiBody({ type: [Task] })
  @ApiResponse({ status: 201, description: 'Tâches créées', type: [Task] })
  createMany(@Body() tasks: Omit<Task, 'id'>[]): Promise<Task[]> {
    return this.tasksService.createMany(tasks)
  }

  @Patch('bulk')
  @ApiOperation({ summary: 'Mettre à jour plusieurs tâches' })
  @ApiBody({ type: [UpdateManyTasksDto] })
  @ApiResponse({ status: 200, description: 'Tâches mises à jour', type: [Task] })
  updateMany(@Body() updates: UpdateManyTasksDto[]): Promise<Task[]> {
    return this.tasksService.updateMany(updates)
  }

  @Delete('bulk')
  @ApiOperation({ summary: 'Supprimer plusieurs tâches' })
  @ApiBody({ type: [String] })
  @ApiResponse({ status: 200, description: 'Tâches supprimées' })
  removeMany(@Body() ids: string[]): Promise<void> {
    return this.tasksService.deleteMany(ids)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une tâche par son ID' })
  @ApiParam({ name: 'id', description: 'ID de la tâche' })
  @ApiResponse({ status: 200, description: 'Tâche trouvée', type: Task })
  @ApiResponse({ status: 404, description: 'Tâche non trouvée' })
  findOne(@Param('id') id: string): Promise<Task | null> {
    return this.tasksService.getById(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une tâche' })
  @ApiParam({ name: 'id', description: 'ID de la tâche' })
  @ApiBody({ type: Task })
  @ApiResponse({ status: 200, description: 'Tâche mise à jour', type: Task })
  @ApiResponse({ status: 404, description: 'Tâche non trouvée' })
  update(@Param('id') id: string, @Body() task: Partial<Omit<Task, 'id'>>): Promise<Task> {
    return this.tasksService.update(id, task)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une tâche' })
  @ApiParam({ name: 'id', description: 'ID de la tâche' })
  @ApiResponse({ status: 200, description: 'Tâche supprimée' })
  @ApiResponse({ status: 404, description: 'Tâche non trouvée' })
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.delete(id)
  }
}
