import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/third-party/jwt/jwt.strategy';
import { UsersRepository } from 'src/database/users/user.repository';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';
import { JwtConfigModule } from 'src/third-party/jwt/jwt.module';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    UsersModule,
    DatabaseModule,
    JwtConfigModule,
  ],
  providers: [JwtStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
