import { Model } from 'objection';
import { Role } from '../roles/roles.model';
import { User } from '../users/users.model';

export class Application extends Model {
  static tableName = 'applications';
  static schemaName = 'public';

  id: number;
  name: string;
  description?: string;
  ownerId: number;
  createdAt?: Date;
  updatedAt?: Date;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'ownerId'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', maxLength: 1000 },
        ownerId: { type: 'integer' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    };
  }
  static relationMappings = {
    roles: {
      relation: Model.HasManyRelation,
      modelClass: Role,
      join: {
        from: 'applications.id',
        to: 'roles.applicationId',
      },
    },
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'applications.ownerId',
        to: 'users.id',
      },
    },
    users: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: 'applications.id',
        through: {
          from: 'userRoles.applicationId',
          to: 'userRoles.userId',
        },
        to: 'users.id',
      },
    },
  };
}
