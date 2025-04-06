import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Permissions } from './permissions.entity'

@Entity('tasks')
export class Task extends Permissions {
  @ApiProperty({ description: 'ID unique de la tâche' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({ description: 'Titre de la tâche' })
  @Column({ type: 'varchar', length: 255 })
  title: string

  @ApiProperty({ description: 'État de complétion de la tâche', default: false })
  @Column({ type: 'boolean', default: false })
  isDone?: boolean
}
