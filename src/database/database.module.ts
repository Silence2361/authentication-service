import { Global, Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { User } from './users/users.model';
import { UsersRepository } from './users/user.repository';

@Global()
@Module({
  imports: [ObjectionModule.forFeature([User])],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class DatabaseModule {}
