export interface IRegister {
  email: string;
  password: string;
  secretQuestion: string;
  secretAnswer: string;
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

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IGetSecretQuestion {
  email: string;
}

export interface IGetSecretQuestionResponse {
  secretQuestion: string;
}

export interface IResetPassword {
  email: string;
  secretAnswer: string;
  newPassword: string;
  confirmNewPassword: string;
}
