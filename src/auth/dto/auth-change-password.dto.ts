import { IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  @MinLength(8)
  //   @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, {
  //     message: 'Password too weak',
  //   })
  newPassword: string;

  @IsString()
  confirmNewPassword: string;
}
