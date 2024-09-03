import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from 'nestjs-objection/dist';
import { AuthModule } from './auth/auth.module';
import { JwtConfigModule } from './third-party/jwt/jwt.module';
import { AppConfigModule } from './third-party/config/config.module';
import { ApplicationModule } from './application/application.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),

    ObjectionModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          config: {
            client: 'pg',
            connection: {
              host: configService.get<string>('DATABASE_HOST'),
              port: configService.get<number>('DATABASE_PORT'),
              user: configService.get<string>('DATABASE_USER'),
              password: configService.get<string>('DATABASE_PASSWORD'),
              database: configService.get<string>('DATABASE_NAME'),
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    JwtConfigModule,
    AppConfigModule,
    ApplicationModule,
    RolesModule,
  ],
})
export class AppModule {
  constructor(configService: ConfigService) {
    configService.get<string>('JWT_SECRET');
  }
}
