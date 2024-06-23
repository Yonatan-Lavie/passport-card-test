import { body, param } from 'express-validator';

// Validation rules for user registration
export const registerValidation = [
  // Validate that 'username' is a string with a length between 4 and 15 characters
  body('username')
    .isString()
    .isLength({ min: 4, max: 15 })
    .withMessage('Username must be between 4 to 15 characters long'),
  // Validate that 'password' has a minimum length of 5 characters
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
];

// Validation rule for checking if a parameter is a valid UUID
export const isUserIDValidation = [
  // Validate that 'userId' parameter is a valid UUID
  param('userId').isUUID().withMessage('Invalid user ID format'),
];
