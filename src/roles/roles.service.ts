import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ICreateRole,
  ICreateRoleResponse,
  IDeleteRoleById,
  IFindAllRolesResponse,
  IFindRoleById,
  IFindRoleByIdResponse,
  IRole,
  IUpdateRoleById,
} from 'src/database/roles/roles.interfaces';
import { RolesRepository } from 'src/database/roles/roles.repository';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async createRole(params: ICreateRole): Promise<ICreateRoleResponse> {
    const { name, applicationId } = params;

    const existingRole = await this.rolesRepository.findRoleByName(name);

    if (existingRole || existingRole.applicationId === applicationId) {
      throw new ConflictException(`This role ${name} already existed`);
    }

    const role: IRole = await this.rolesRepository.createRole({
      name,
      applicationId,
    });

    return { id: role.id };
  }

  async findRoles(): Promise<IFindAllRolesResponse[]> {
    const roles = await this.rolesRepository.findRoles();

    return roles.map((role) => ({
      id: role.id,
      name: role.name,
      applicationId: role.applicationId,
    }));
  }

  async findRoleById(params: IFindRoleById): Promise<IFindRoleByIdResponse> {
    const { id } = params;

    const role: IRole = await this.rolesRepository.findRoleById(id);

    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    return {
      id: role.id,
      name: role.name,
      applicationId: role.applicationId,
    };
  }

  async updateRoleById(roleId: number, params: IUpdateRoleById): Promise<void> {
    const { name, applicationId } = params;

    const role: IRole = await this.rolesRepository.findRoleById(roleId);

    if (!role) {
      throw new NotFoundException(`Role with this id ${roleId} not found `);
    }

    const roleName = await this.rolesRepository.findRoleByName(name);

    if (roleName) {
      throw new ConflictException(`This role ${name} already exists`);
    }

    const updateRoleData = {
      name,
      applicationId,
    };

    await this.rolesRepository.updateRoleById(roleId, updateRoleData);
  }

  async deleteRoleById(params: IDeleteRoleById): Promise<void> {
    const { id } = params;

    const role: IRole = await this.rolesRepository.findRoleById(id);

    if (!role) {
      throw new NotFoundException(`Role with this id ${id} not found `);
    }

    await this.rolesRepository.deleteRoleById(id);
  }
}
