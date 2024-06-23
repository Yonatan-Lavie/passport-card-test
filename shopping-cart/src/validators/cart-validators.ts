import { body } from 'express-validator';

// Validation rules for adding an item to the cart
export const addToCartValidation = [
  // Validate that 'userId' is a valid UUID
  body('userId').isUUID().withMessage('Invalid user ID format'),
  // Validate that 'productId' is a valid UUID
  body('productId').isUUID().withMessage('Invalid product ID format'),
  // Validate that 'quantity' is an integer greater than 0
  body('quantity')
    .isInt({ gt: 0 })
    .withMessage('Quantity must be greater than 0'),
];

// Validation rules for updating an item in the cart
export const updateCartValidation = [
  // Validate that 'userId' is a valid UUID
  body('userId').isUUID().withMessage('Invalid user ID format'),
  // Validate that 'productId' is a valid UUID
  body('productId').isUUID().withMessage('Invalid product ID format'),
  // Validate that 'quantity' is an integer
  body('quantity').isInt().withMessage('Must be a number'),
];

// Validation rules for removing an item from the cart
export const removeFromCartValidation = [
  // Validate that 'userId' is a valid UUID
  body('userId').isUUID().withMessage('Invalid user ID format'),
  // Validate that 'productId' is a valid UUID
  body('productId').isUUID().withMessage('Invalid product ID format'),
];
