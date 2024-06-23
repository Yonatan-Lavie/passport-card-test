// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CustomError } from './custom-error';

export class DatabaseError extends CustomError {
  statusCode = 500;
  reason = 'Database Error';
  meta: Record<string, unknown> = {};

  constructor(
    message: string,
    public error: PrismaClientKnownRequestError
  ) {
    super(`Database Error: ${message}`);

    let customMeta: Record<string, unknown> = {};

    switch (error.code) {
      case 'P2002':
        customMeta = {
          code: error.code,
          message: 'unique constraint violation',
        };
        break;
      case 'P2025':
        customMeta = {
          code: error.code,
          message: 'no matches were found',
        };
        break;

      default:
        customMeta = { code: error.code };
        break;
    }
    this.meta = { ...error.meta, ...customMeta };
  }

  serializeErrors() {
    return [{ message: this.message, meta: this.meta }];
  }
}
