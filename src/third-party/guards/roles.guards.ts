import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/database/roles/roles.enum/roles.enum';
import { User } from 'src/database/users/users.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles: UserRole[] = this.reflector.getAllAndOverride<
      UserRole[]
    >('roles', [context.getHandler(), context.getClass()]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      console.log('User not found in request.');
      return false;
    }

    const userWithRole = await User.query()
      .findById(user.id)
      .withGraphFetched('role');

    if (!userWithRole) {
      console.log('User not found in database.');
      return false;
    }

    const hasRole = requiredRoles.includes(userWithRole.role.name);

    if (!hasRole) {
      console.log('User does not have the required role.');
    }
    return hasRole;
  }
}
