import { Router } from 'express';
import { body } from 'express-validator';
import { addUser, getUsers } from '../controllers/user';
import { registerValidation } from '../validators/user-validators';
import { validateRequest } from '../middlewares/validate-request';

// Create a new router instance
const router = Router();

// Route for registering a new user
// Validates the request body and calls the addUser controller if validation passes
router.post('/register', registerValidation, validateRequest, addUser);

// Route for getting the list of users
// Calls the getUsers controller
router.get('/', getUsers);

// Export the configured router instance
export { router };
