import { CustomError } from './custom-error';

export class UnknownError extends CustomError {
  statusCode: number = 500;
  constructor(
    message: string,
    private meta?: Record<string, unknown>
  ) {
    super(`Unknown Error: ${message}`);
  }
  serializeErrors(): {
    message: string;
    field?: string | undefined;
    value?: string | undefined;
    meta?: Record<string, unknown> | undefined;
  }[] {
    return [{ message: this.message, meta: this.meta }];
  }
}
