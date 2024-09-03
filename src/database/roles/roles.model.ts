import { Model } from 'objection';
import { UserRole } from './roles.enum/roles.enum';
import { Application } from '../application/application.model';

export class Role extends Model {
  static tableName = 'roles';

  id: number;
  name: UserRole;
  applicationId: number;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'applicationId'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', enum: Object.values(UserRole) },
        applicationId: { type: 'integer' },
      },
    };
  }

  static relationMappings = {
    application: {
      relation: Model.BelongsToOneRelation,
      modelClass: Application,
      join: {
        from: 'roles.applicationId',
        to: 'applications.id',
      },
    },
  };
}
