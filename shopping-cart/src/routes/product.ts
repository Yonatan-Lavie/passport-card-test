import { Router } from 'express';
import { body } from 'express-validator';
import { addProduct, getProducts } from '../controllers/product';
import { productValidation } from '../validators/product-validators';
import { validateRequest } from '../middlewares/validate-request';

// Create a new router instance
const router = Router();

// Route for adding a new product
// Validates the request body and calls the addProduct controller if validation passes
router.post('/', productValidation, validateRequest, addProduct);

// Route for getting the list of products
// Calls the getProducts controller
router.get('/', getProducts);

// Export the configured router instance
export { router };
