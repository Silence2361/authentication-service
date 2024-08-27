import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { ModelClass } from 'objection';
import { ICreateUser, IUpdateUser, IUser } from './user.interface';
import { InjectModel } from 'nestjs-objection';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User) private readonly userModel: ModelClass<User>,
  ) {}

  async createUser(createUser: ICreateUser): Promise<IUser> {
    return this.userModel.query().insert(createUser);
  }

  async findUsers(): Promise<IUser[]> {
    return this.userModel.query();
  }

  async findUserById(userId: number): Promise<IUser | null> {
    return this.userModel.query().findById(userId);
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return this.userModel.query().findOne({ email });
  }

  async updateUserById(userId: number, updateUser: IUpdateUser): Promise<void> {
    await this.userModel.query().patchAndFetchById(userId, updateUser);
  }

  async deleteUserById(userId: number): Promise<void> {
    await this.userModel.query().deleteById(userId);
  }
}
