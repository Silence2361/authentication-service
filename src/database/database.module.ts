import { Global, Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { User } from './users/users.model';
import { UsersRepository } from './users/user.repository';
import { Application } from './application/application.model';
import { ApplicationRepository } from './application/application.repository';

@Global()
@Module({
  imports: [
    ObjectionModule.forFeature([User]),
    ObjectionModule.forFeature([Application]),
  ],
  providers: [UsersRepository, ApplicationRepository],
  exports: [UsersRepository, ApplicationRepository],
})
export class DatabaseModule {}
