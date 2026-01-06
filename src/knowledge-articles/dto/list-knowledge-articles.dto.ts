import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListKnowledgeArticlesDto {
  @ApiPropertyOptional({
    example: 'DevOps',
    description: 'Filter by article title or alias',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Filter by tenant id',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  tenantId?: number;

  @ApiPropertyOptional({
    example: 2024,
    description: 'Filter by published year',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  publishedYear?: number;
}
