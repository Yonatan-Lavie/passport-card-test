export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
  }

  abstract serializeErrors(): {
    message: string;
    field?: string;
    value?: string;
    meta?: Record<string, unknown>;
  }[];
}
