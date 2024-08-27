import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthRegisterResponseDto } from './dto/auth-register-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() authRegisterDto: AuthRegisterDto,
  ): Promise<AuthRegisterResponseDto> {
    return this.authService.register(authRegisterDto);
  }
}
