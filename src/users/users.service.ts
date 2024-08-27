import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ICreateUser,
  ICreateUserResponse,
  IDeleteUserById,
  IFindAllUsersResponse,
  IFindUserById,
  IFindUserByIdResponse,
  IUpdateUserById,
  IUser,
} from 'src/database/users/user.interface';
import { UsersRepository } from 'src/database/users/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(params: ICreateUser): Promise<ICreateUserResponse> {
    const { email, password } = params;

    const existingUser = await this.usersRepository.findUserByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await this.usersRepository.createUser({
      email,
      password: hashedPassword,
    });

    return { id: user.id };
  }

  async findUsers(): Promise<IFindAllUsersResponse[]> {
    const users: IUser[] = await this.usersRepository.findUsers();

    return users.map((user) => ({
      id: user.id,
      email: user.email,
    }));
  }

  async findUserById(params: IFindUserById): Promise<IFindUserByIdResponse> {
    const { id } = params;

    const user: IUser | null = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return {
      id: user.id,
      email: user.email,
    };
  }

  async updateUserById(userId: number, params: IUpdateUserById): Promise<void> {
    const { email, password } = params;

    const user: IUser | null = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    let hashedPassword: string | undefined;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updateUserData = {
      email,
      password: hashedPassword || password,
    };

    await this.usersRepository.updateUserById(userId, updateUserData);
  }

  async deleteUserById(params: IDeleteUserById): Promise<void> {
    const { id } = params;

    const user = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.usersRepository.deleteUserById(id);
  }
}
