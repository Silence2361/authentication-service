export interface IUser {
  id: number;
  email: string;
  password: string;
}

export interface ICreateUser {
  email: string;
  password: string;
}

export interface IUpdateUser {
  email?: string;
  password?: string;
}

export interface ICreateUserResponse {
  id: number;
}

export interface IFindAllUsersResponse {
  id: number;
  email: string;
}

export interface IFindUserById {
  id: number;
}

export interface IFindUserByIdResponse {
  id: number;
  email: string;
}

export interface IUpdateUserById {
  email?: string;
  password?: string;
}

export interface IDeleteUserById {
  id: number;
}
