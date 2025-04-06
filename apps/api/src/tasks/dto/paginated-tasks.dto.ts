import { Task } from '../entities/task.entity'

export class PaginatedTasksDto {
  items: Task[]
  total: number
} 