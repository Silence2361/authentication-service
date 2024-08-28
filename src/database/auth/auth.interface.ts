export interface IRegister {
  email: string;
  password: string;
}

export interface IRegisterResponse {
  id: number;
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
}
