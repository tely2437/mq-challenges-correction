import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, IsNumber, Min } from 'class-validator'

export class GetTasksDto {
  @ApiPropertyOptional({ description: 'Terme de recherche' })
  @IsOptional()
  @IsString()
  search?: string

  @ApiPropertyOptional({ description: 'Nombre d\'éléments à sauter', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number

  @ApiPropertyOptional({ description: 'Nombre d\'éléments à prendre', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  take?: number
}
