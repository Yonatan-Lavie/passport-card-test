import { Request, Response, NextFunction } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/requerst-validation-error';

// Middleware function to validate the request
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract validation errors from the request
  const errors = validationResult(req);

  // If there are validation errors, throw a RequestValidationError
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  // If no validation errors, proceed to the next middleware/controller
  next();
};
