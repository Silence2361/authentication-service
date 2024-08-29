export class ResetPasswordDto {
  email: string;
  secretAnswer: string;
  newPassword: string;
  confirmNewPassword: string;
}
