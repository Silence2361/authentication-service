import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AuthRegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsInt()
  roleId: number;

  @IsString()
  secretQuestion: string;

  @IsString()
  secretAnswer: string;
}
