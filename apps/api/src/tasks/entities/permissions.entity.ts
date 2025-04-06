import { BaseEntity, Column, Entity } from 'typeorm'

export enum PermissionsEnum {
  READ = 'read',
  EDIT = 'edit',
  DELETE = 'delete',
}

@Entity()
export abstract class Permissions extends BaseEntity {

  @Column({ type: 'boolean', default: false })
  canRead?: boolean

  @Column({ type: 'boolean', default: false })
  canEdit?: boolean

  @Column({ type: 'boolean', default: false })
  canDelete?: boolean
}
