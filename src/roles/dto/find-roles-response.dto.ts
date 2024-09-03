import { UserRole } from 'src/database/roles/roles.enum/roles.enum';

export class FindRolesResponseDto {
  id: number;
  name: UserRole;
  applicationId: number;
}
