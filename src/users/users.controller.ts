import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { FindUsersResponseDto } from './dto/find-users-response.dto';
import { FindUserByIdResponseDto } from './dto/find-user-by-id.response.dto';
import { UpdateUserByIdDto } from './dto/update-user-by-id.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async findUsers(): Promise<FindUsersResponseDto[]> {
    return this.usersService.findUsers();
  }

  @Get(':id')
  async findUserById(
    @Param('id')
    id: number,
  ): Promise<FindUserByIdResponseDto | null> {
    return this.usersService.findUserById({ id });
  }

  @Put(':id')
  async updateUserById(
    @Param('id') id: number,
    @Body() updateUserByIdDto: UpdateUserByIdDto,
  ): Promise<void> {
    return this.usersService.updateUserById(id, updateUserByIdDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: number): Promise<void> {
    return this.usersService.deleteUserById({ id });
  }
}
