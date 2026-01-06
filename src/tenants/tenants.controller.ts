import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantsService } from './tenant.service';

@ApiTags('tenants')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a tenant' })
  @ApiResponse({
    status: 201,
    description: 'Tenant created successfully',
  })
  public async create(@Body() dto: CreateTenantDto) {
    return this.tenantsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all tenants' })
  @ApiResponse({
    status: 200,
    description: 'List of tenants',
  })
  public async findAll() {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tenant by id' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Tenant found',
  })
  @ApiResponse({
    status: 404,
    description: 'Tenant not found',
  })
  public async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tenantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tenant' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Tenant updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Tenant not found',
  })
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTenantDto,
  ) {
    return this.tenantsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tenant' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Tenant deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Tenant not found',
  })
  public async remove(@Param('id', ParseIntPipe) id: number) {
    return this.tenantsService.remove(id);
  }
}
