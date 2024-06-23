import { Prisma } from '@prisma/client';
import prisma from './prisma';

// Maximum number of retry attempts for a transaction
const MAX_RETRIES = 3;

// Type definition for a transaction function that uses Prisma's transaction client
type TransactionFunction<T> = (prisma: Prisma.TransactionClient) => Promise<T>;

// Function to execute a transaction with retry logic
export const transactionWithRetries = async <T>(
  fn: TransactionFunction<T>
): Promise<T> => {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      // Attempt to execute the transaction
      return await prisma.$transaction(
        async (transactionPrisma) => {
          // Call the provided transaction function with the transaction client
          return await fn(transactionPrisma);
        },
        {
          // Set the isolation level for the transaction to Serializable
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        }
      );
    } catch (error) {
      // Check if the error is a known Prisma client error and specifically a P2034 code (transaction conflict)
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2034'
      ) {
        retries++;
        console.log(`Transaction failed, retrying... ${retries}`);
      } else {
        // If it's a different error, rethrow it
        throw error;
      }
    }
  }

  // If the maximum number of retries is reached, throw an error
  throw new Error('Max retries reached');
};
