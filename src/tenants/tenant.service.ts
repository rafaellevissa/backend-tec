import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tenant } from './tenant.model';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(
    @InjectModel(Tenant)
    private readonly tenantModel: typeof Tenant,
  ) {}

  async create(dto: CreateTenantDto): Promise<Tenant> {
    return this.tenantModel.create({
      name: dto.name,
      primaryLocale: dto.primaryLocale ?? 'en-US',
    });
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantModel.findAll();
  }

  async findOne(id: number): Promise<Tenant> {
    const tenant = await this.tenantModel.findByPk(id);

    if (!tenant) {
      throw new NotFoundException(`Tenant with id ${id} not found`);
    }

    return tenant;
  }

  async update(id: number, dto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.findOne(id);

    await tenant.update(dto);
    return tenant;
  }

  async remove(id: number): Promise<void> {
    const tenant = await this.findOne(id);
    await tenant.destroy();
  }
}
