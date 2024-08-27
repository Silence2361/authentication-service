import { Model } from 'objection';

export class User extends Model {
  static tableName = 'users';
  static schemaName = 'public';

  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string', format: 'email', minLength: 6, maxLength: 40 },
        password: { type: 'string', minLength: 6, maxLength: 255 },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    };
  }
}
