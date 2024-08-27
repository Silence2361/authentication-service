import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthRegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
