import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/database/users/user.repository';
import * as bcrypt from 'bcrypt';
import {
  ILogin,
  ILoginResponse,
  IRegister,
  IRegisterResponse,
} from 'src/database/auth/auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRespository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(credentials: ILogin): Promise<ILoginResponse> {
    const { email, password } = credentials;

    const user = await this.usersRespository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not fount');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong Password');
    }

    const payload = { id: user.id };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
