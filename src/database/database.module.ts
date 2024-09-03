import { Global, Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { User } from './users/users.model';
import { UsersRepository } from './users/user.repository';
import { Application } from './application/application.model';
import { ApplicationRepository } from './application/application.repository';
import { Role } from './roles/roles.model';
import { RolesRepository } from './roles/roles.repository';

@Global()
@Module({
  imports: [ObjectionModule.forFeature([User, Application, Role])],
  providers: [UsersRepository, ApplicationRepository, RolesRepository],
  exports: [
    UsersRepository,
    ObjectionModule,
    ApplicationRepository,
    RolesRepository,
  ],
})
export class DatabaseModule {}
