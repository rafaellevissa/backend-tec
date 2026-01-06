import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class AliasDto {
  @ApiProperty({ example: 'DevOps Overview' })
  @IsString()
  name: string;
}

export class CreateKnowledgeArticleDto {
  @ApiProperty({ example: 'DevOps Basics' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'An introduction to DevOps concepts' })
  @IsString()
  body: string;

  @ApiProperty({ example: 2024 })
  @IsInt()
  publishedYear: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  tenantId: number;

  @ApiProperty({
    type: [AliasDto],
    example: [{ name: 'DevOps Overview' }],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AliasDto)
  aliases: AliasDto[];

  @ApiProperty({
    example: [1, 2],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  topicIds?: number[];
}
