import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({
    example: 'Acme Inc',
    description: 'Tenant name',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'en-US',
    description: 'Primary locale of the tenant',
    default: 'en-US',
  })
  @IsOptional()
  @IsString()
  primaryLocale?: string;
}
