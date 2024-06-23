import { NextFunction, Request, Response } from 'express';
import prisma from '../services/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UnknownError } from '../errors/unknown-error';
import { DatabaseError } from '../errors/database-error';

// Controller function to add a new user
export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    // Attempt to create a new user in the database
    const user = await prisma.user.create({ data: { username, password } });
    // Respond with the created user
    res.json(user);
  } catch (error) {
    // Handle known Prisma client errors
    if (error instanceof PrismaClientKnownRequestError) {
      return next(new DatabaseError('Failed to create new user', error));
    }
    // Handle unknown errors
    return next(
      new UnknownError('Failed to create new user', { error: error })
    );
  }
};

// Controller function to get all users
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Attempt to retrieve all users from the database
    const users = await prisma.user.findMany();
    // Respond with the retrieved users
    res.json(users);
  } catch (error) {
    // Handle unknown errors
    return next(new UnknownError('Failed to get users', { error: error }));
  }
};
