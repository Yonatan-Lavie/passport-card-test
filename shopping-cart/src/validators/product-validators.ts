import { body } from 'express-validator';

// Validation rules for product information
export const productValidation = [
  // Validate that 'sku' is not empty
  body('sku').notEmpty().withMessage("SKU can't be empty"),
  // Validate that 'price' is a float
  body('price').isFloat().withMessage('Price must be a float'),
  // Validate that 'stock' is an integer greater than 0
  body('stock').isInt({ gt: 0 }).withMessage('Stock must be a positive number'),
];
