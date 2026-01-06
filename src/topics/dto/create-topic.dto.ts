import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicDto {
  @ApiProperty({
    example: 'DevOps',
    description: 'Topic name',
  })
  @IsString()
  name: string;
}
