import { Model } from 'objection';

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
}
