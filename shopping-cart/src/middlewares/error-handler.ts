import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

// Middleware function for handling errors
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the error is an instance of CustomError
  if (err instanceof CustomError) {
    console.log(`[Error] ${err.message}`);
    // If it is, respond with the appropriate status code and serialized errors
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // If the error is not a CustomError, respond with a generic error message
  return res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
