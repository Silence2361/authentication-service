import { UserRole } from 'src/database/roles/roles.enum/roles.enum';

export class FindRoleByIdResponseDto {
  id: number;
  name: UserRole;
  applicationId: number;
}
