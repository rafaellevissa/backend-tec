import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTopicDto {
  @ApiProperty({
    example: 'Cloud Computing',
    description: 'Updated topic name',
  })
  @IsString()
  name: string;
}
