import express, { NextFunction, Request, Response } from 'express';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { router as cartRouter } from './routes/cart';
import { router as productRouter } from './routes/product';
import { router as userRouter } from './routes/user';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route for user-related operations
app.use('/users', userRouter);

// Route for product-related operations
app.use('/product', productRouter);

// Route for cart-related operations
app.use('/cart', cartRouter);

// Catch-all route for handling not found errors
app.use('*', (req: Request, res: Response) => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
