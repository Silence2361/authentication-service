import { Role } from '../roles/roles.model';

export interface IUser {
  id: number;
  email: string;
  password: string;
  roleId: number;
  secretQuestion: string;
  secretAnswer: string;
}

export interface ICreateUser {
  email: string;
  password: string;
  roleId: number;
  secretQuestion?: string;
  secretAnswer?: string;
}

export interface IUpdateUser {
  email?: string;
  password?: string;
  roleId?: number;
}

export interface ICreateUserResponse {
  id: number;
}

export interface IFindAllUsersResponse {
  id: number;
  email: string;
  roleId: number;
}

export interface IFindUserById {
  id: number;
}

export interface IFindUserByIdResponse {
  id: number;
  email: string;
  roleId: number;
}

export interface IUpdateUserById {
  email?: string;
  password?: string;
  roleId?: number;
}

export interface IDeleteUserById {
  id: number;
}
