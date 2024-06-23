import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor(message?: string) {
    super('Route not found' || message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
