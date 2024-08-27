import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/database/users/user.repository';
import * as bcrypt from 'bcrypt';
import { IRegister, IRegisterResponse } from 'src/database/auth/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersRespository: UsersRepository) {}

  async register(credentials: IRegister): Promise<IRegisterResponse> {
    const { email, password } = credentials;

    const candidate = await this.usersRespository.findUserByEmail(email);

    if (candidate) {
      throw new ConflictException(`This email ${email} already registered`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRespository.createUser({
      email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      email: user.email,
    };
  }
}
