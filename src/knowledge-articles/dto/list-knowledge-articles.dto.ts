import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ListKnowledgeArticlesDto {

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  tenantId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  publishedYear?: number;
}
