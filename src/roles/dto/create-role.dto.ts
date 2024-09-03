import { UserRole } from 'src/database/roles/roles.enum/roles.enum';

export class CreateRoleDto {
  name: UserRole;
  applicationId: number;
}
