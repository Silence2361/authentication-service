import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthRegisterResponseDto } from './dto/auth-register-response.dto';
import { AuthLoginResponseDto } from './dto/auth-login-response.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { ChangePasswordDto } from './dto/auth-change-password.dto';
import { JwtAuthGuard } from 'src/third-party/jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() authRegisterDto: AuthRegisterDto,
  ): Promise<AuthRegisterResponseDto> {
    return this.authService.register(authRegisterDto);
  }

  @Post('login')
  async login(
    @Body() authLoginDto: AuthLoginDto,
  ): Promise<AuthLoginResponseDto> {
    return this.authService.login(authLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    return this.authService.changePassword(req.user.id, changePasswordDto);
  }
}
