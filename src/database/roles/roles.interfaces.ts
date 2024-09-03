import { UserRole } from './roles.enum/roles.enum';

export interface IRole {
  id: number;
  name: UserRole;
  applicationId: number;
}

export interface ICreateRole {
  name: UserRole;
  applicationId: number;
}

export interface ICreateRoleResponse {
  id: number;
}

export interface IFindAllRolesResponse {
  id: number;
  name: UserRole;
  applicationId: number;
}

export interface IFindRoleById {
  id: number;
}

export interface IFindRoleByIdResponse {
  id: number;
  name: UserRole;
  applicationId: number;
}

export interface IUpdateRoleById {
  name?: UserRole;
  applicationId: number;
}

export interface IDeleteRoleById {
  id: number;
}
