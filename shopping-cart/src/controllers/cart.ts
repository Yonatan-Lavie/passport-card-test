import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../services/prisma';
import { BadRequestError } from '../errors/bad-request-error';
import { DatabaseError } from '../errors/database-error';
import { UnknownError } from '../errors/unknown-error';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NotFoundError } from '../errors/not-found-error';
import { CustomError } from '../errors/custom-error';
import { transactionWithRetries } from '../services/transaction-with-retries';

// Controller function to add an item to the cart
export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Execute the transaction with retry logic
    await transactionWithRetries(async (prisma: Prisma.TransactionClient) => {
      // Find the product in the database
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new NotFoundError('Product not found');
      }

      if (product.stock < quantity) {
        throw new BadRequestError('Insufficient stock');
      }

      // Update the product's stock
      await prisma.product.update({
        where: { id: productId },
        data: { stock: product.stock - quantity },
      });
    });

    // Upsert the cart item quantity
    const cartItem = await prisma.cart.upsert({
      where: { userId_productId: { userId, productId } },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: { userId, productId, quantity },
    });

    res.json(cartItem);
  } catch (error) {
    // Handle custom errors
    if (error instanceof CustomError) {
      return next(error);
    }
    // Handle known Prisma client errors
    if (error instanceof PrismaClientKnownRequestError) {
      return next(new DatabaseError('Failed to add products to cart', error));
    }
    // Handle unknown errors
    return next(
      new UnknownError('Failed to add product to cart', { error: error })
    );
  }
};

// Controller function to get the cart of a specific user
export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;

  try {
    // Retrieve the cart items for the user
    const cartItems = await prisma.cart.findMany({
      where: { userId },
    });
    // Respond with the retrieved cart items
    res.json(cartItems);
  } catch (error) {
    // Handle known Prisma client errors
    if (error instanceof PrismaClientKnownRequestError) {
      return next(new DatabaseError('Failed to get cart', error));
    }
    // Handle unknown errors
    return next(new UnknownError('Failed to get cart', { error: error }));
  }
};

// Controller function to update the quantity of an item in the cart
export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cartItem;

    // Execute the transaction with retry logic
    await transactionWithRetries(async (tx: Prisma.TransactionClient) => {
      // Find the cart item
      cartItem = await tx.cart.findUnique({
        where: {
          userId_productId: { userId, productId },
        },
      });

      if (!cartItem) {
        throw new NotFoundError('Cart not found');
      }

      if (cartItem.quantity + quantity < 0) {
        throw new BadRequestError('Insufficient quantity to remove');
      }

      // Find the product in the database
      const product = await tx.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new NotFoundError('Product not found');
      }

      if (product.stock < quantity) {
        throw new BadRequestError('Insufficient stock');
      }

      // Update the product's stock
      await tx.product.update({
        where: { id: productId },
        data: { stock: product.stock - quantity },
      });

      // Update the cart item quantity
      cartItem = await tx.cart.update({
        where: { userId_productId: { userId, productId } },
        data: {
          quantity: {
            increment: quantity,
          },
        },
      });
    });

    // Respond with the updated cart item
    res.json(cartItem);
  } catch (error) {
    // Handle custom errors
    if (error instanceof CustomError) {
      return next(error);
    }

    // Handle known Prisma client errors
    if (error instanceof PrismaClientKnownRequestError) {
      return next(new DatabaseError('Failed to update cart', error));
    }

    // Handle unknown errors
    return next(new UnknownError('Failed to update cart', { error: error }));
  }
};

export const removeFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, productId } = req.body;

  try {
    let cartItem;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    await transactionWithRetries(async (prisma: Prisma.TransactionClient) => {
      cartItem = await prisma.cart.findUnique({
        where: { userId_productId: { userId, productId } },
      });

      if (!cartItem) {
        throw new NotFoundError('Cart not found');
      }

      cartItem = await prisma.cart.delete({
        where: { userId_productId: { userId, productId } },
      });

      await prisma.product.update({
        where: { id: productId },
        data: { stock: product.stock + cartItem.quantity },
      });
    });

    res.json(cartItem);
  } catch (error) {
    if (error instanceof CustomError) {
      return next(error);
    }
    if (error instanceof PrismaClientKnownRequestError) {
      return next(
        new DatabaseError('Failed to remove product from cart', error)
      );
    }
    return next(
      new UnknownError('faild to remove product from cart', { error: error })
    );
  }
};
