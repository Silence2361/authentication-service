import { Role } from './roles.model';
import { ModelClass } from 'objection';
import { ICreateRole, IRole, IUpdateRoleById } from './roles.interfaces';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectModel(Role) private readonly roleModel: ModelClass<Role>,
  ) {}

  async createRole(createRole: ICreateRole): Promise<IRole> {
    return this.roleModel.query().insert(createRole);
  }

  async findRoles(): Promise<IRole[]> {
    return this.roleModel.query();
  }

  async findRoleById(roleId: number): Promise<IRole | null> {
    return this.roleModel.query().findById(roleId);
  }

  async findRoleByName(name: string): Promise<IRole | null> {
    const result: IRole | null = await this.roleModel
      .query()
      .where('name', name)
      .first();
    return result;
  }

  async updateRoleById(
    roleId: number,
    updateRoleById: IUpdateRoleById,
  ): Promise<void> {
    await this.roleModel.query().patchAndFetchById(roleId, updateRoleById);
  }

  async deleteRoleById(roleId: number): Promise<void> {
    await this.roleModel.query().deleteById(roleId);
  }
}
