import { ApiProperty } from '@nestjs/swagger'
import { Task } from '../entities/task.entity'

export class UpdateManyTasksDto {
  @ApiProperty({ type: String })
  id: string

  @ApiProperty({ type: Task })
  data: Partial<Omit<Task, 'id'>>
} 