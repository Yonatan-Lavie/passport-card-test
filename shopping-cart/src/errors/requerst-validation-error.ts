import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      switch (error.type) {
        case 'field':
          // `error` is a `FieldValidationError`
          console.log('field', error.path, error.location, error.value);
          return {
            message: error.msg,
            field: error.path,
            value: error.value || null,
          };
          break;

        case 'alternative':
          // `error` is an `AlternativeValidationError`
          console.log(error.nestedErrors);
          return {
            message: 'Alternative grouped error',
            field: error.nestedErrors.toString(),
          };
          break;

        case 'alternative_grouped':
          // `error` is a `GroupedAlternativeValidationError`
          error.nestedErrors.forEach((nestedErrors, i) => {
            console.log(`Errors from chain ${i}:`);
            console.log(nestedErrors);
          });
          return {
            message: 'Alternative grouped error',
            field: error.nestedErrors.toString(),
          };
          break;

        case 'unknown_fields':
          // `error` is an `UnknownFieldsError`
          console.log(error.fields);
          console.log(error.fields.toString());
          return {
            message: 'Unknown fields error',
            field: error.fields.toString(),
          };

        default:
          // Error is not any of the known types! Do something else.
          // throw new Error(`Unknown error type ${error}`);
          return { message: 'Unknown error type' };
      }
    });
  }
}
