import { PrismaClient } from '@prisma/client';
import { LogEvent, QueryEvent } from '../types';

// Instantiate a new PrismaClient with logging configuration
const prisma = new PrismaClient({
  log: [
    // Log query events and emit them as events
    { level: 'query', emit: 'event' },
    // Log error events and emit them as events
    { level: 'error', emit: 'event' },
    // Log informational messages and output them to stdout
    { level: 'info', emit: 'stdout' },
  ],
});

// Event listener for query events
prisma.$on('query', (e: QueryEvent) => {
  console.log(
    `[Query] type: ${e.query} params: ${e.params} duration: ${e.duration}ms`
  );
});

// Event listener for error events
prisma.$on('error', (e: LogEvent) => {
  console.log(
    `[Prisma Error] target: ${e.target}, time: ${new Date(
      e.timestamp
    ).toLocaleString('he-IL', {
      timeZone: 'Asia/Jerusalem',
    })}`
  );
});

// Export the configured Prisma client instance
export default prisma;
