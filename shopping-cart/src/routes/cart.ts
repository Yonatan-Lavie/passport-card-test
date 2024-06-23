import { Router } from 'express';
import { body } from 'express-validator';
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from '../controllers/cart';
import {
  addToCartValidation,
  removeFromCartValidation,
  updateCartValidation,
} from '../validators/cart-validators';
import { isUserIDValidation } from '../validators/user-validators';
import { validateRequest } from '../middlewares/validate-request';

// Create a new router instance
const router = Router();

// Route for adding an item to the cart
// Validates the request body and calls the addToCart controller if validation passes
router.post('/', addToCartValidation, validateRequest, addToCart);

// Route for getting the cart of a specific user
// Validates the userId parameter and calls the getCart controller if validation passes
router.get('/:userId', isUserIDValidation, validateRequest, getCart);

// Route for updating an item in the cart
// Validates the request body and calls the updateCart controller if validation passes
router.put('/', updateCartValidation, validateRequest, updateCart);

// Route for removing an item from the cart
// Validates the request body and calls the removeFromCart controller if validation passes
router.delete('/', removeFromCartValidation, validateRequest, removeFromCart);

// Export the configured router instance
export { router };
