import { PrismaClient } from '@prisma/client';
import { QueryEvent } from '../types';



const prisma = new PrismaClient({
    log: [
      { level: 'query', emit: 'event' },
      { level: 'error', emit: 'event' },
      { level: 'info', emit: 'stdout' },
    ],
  });
  
  prisma.$on('query', (e: QueryEvent) => {
    console.log(`Query: ${e.query}`);
    console.log(`Params: ${e.params}`);
    console.log(`Duration: ${e.duration}ms`);
  });
  prisma.$on('error', (e: any) => {
    console.log("\n\nCUSTOM ERROR" + e + "\n\n\n\n");
    
  });


export default prisma;