import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleResponseDto } from './dto/create-role-response.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { FindRolesResponseDto } from './dto/find-roles-response.dto';
import { FindRoleByIdResponseDto } from './dto/find-role-by-id-response.dto';
import { UpdateRoleById } from './dto/update-role-by-id.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/database/roles/roles.enum/roles.enum';
import { JwtAuthGuard } from 'src/third-party/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/third-party/guards/roles.guards';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles(UserRole.admin, UserRole.superAdmin)
  async createRole(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<CreateRoleResponseDto> {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get()
  @Roles(UserRole.user, UserRole.admin, UserRole.superAdmin)
  async findRoles(): Promise<FindRolesResponseDto[]> {
    return this.rolesService.findRoles();
  }

  @Get(':id')
  @Roles(UserRole.user, UserRole.admin, UserRole.superAdmin)
  async findRoleById(
    @Param('id') id: number,
  ): Promise<FindRoleByIdResponseDto | null> {
    return this.rolesService.findRoleById({ id });
  }

  @Put(':id')
  @Roles(UserRole.admin, UserRole.superAdmin)
  async updateRoleById(
    @Param('id') id: number,
    @Body() updateRoleById: UpdateRoleById,
  ): Promise<void> {
    return this.rolesService.updateRoleById(id, updateRoleById);
  }

  @Delete(':id')
  @Roles(UserRole.admin, UserRole.superAdmin)
  async deleteRoleById(@Param('id') id: number): Promise<void> {
    return this.rolesService.deleteRoleById({ id });
  }
}
