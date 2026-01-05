import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class AliasDto {
  @IsString()
  name: string;
}

export class CreateKnowledgeArticleDto {

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsInt()
  publishedYear: number;

  @IsInt()
  tenantId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AliasDto)
  aliases: AliasDto[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  topicIds?: number[];
}
