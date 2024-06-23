import { NextFunction, Request, Response } from 'express';
import prisma from '../services/prisma';
import { DatabaseError } from '../errors/database-error';
import { UnknownError } from '../errors/unknown-error';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

// Controller function to add a new product
export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sku, price, stock, expiration } = req.body;

  try {
    // Attempt to create a new product in the database
    const product = await prisma.product.create({
      data: { sku, price, stock, expiration },
    });

    // Respond with the created product
    res.json(product);
  } catch (error) {
    // Handle known Prisma client errors
    if (error instanceof PrismaClientKnownRequestError) {
      return next(new DatabaseError('Failed to add product', error));
    }
    // Handle unknown errors
    return next(new UnknownError('Failed to add product', { error: error }));
  }
};

// Controller function to get all products
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Attempt to retrieve all products from the database
    const products = await prisma.product.findMany();
    // Respond with the retrieved products
    res.json(products);
  } catch (error) {
    // Handle known Prisma client errors
    if (error instanceof PrismaClientKnownRequestError) {
      return next(new DatabaseError('Failed to get products', error));
    }
    // Handle unknown errors
    return next(new UnknownError('Failed to get products', { error: error }));
  }
};
