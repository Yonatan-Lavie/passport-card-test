// types/index.d.ts

// Type definition for a query event in Prisma
export type QueryEvent = {
  timestamp: Date; // The time when the query was executed
  query: string; // The query sent to the database
  params: string; // The parameters used in the query
  duration: number; // The time elapsed (in milliseconds) between the client issuing the query and the database responding
  target: string; // The target of the query
};

// Type definition for a log event in Prisma
export type LogEvent = {
  timestamp: Date; // The time when the log event was recorded
  message: string; // The log message
  target: string; // The target of the log event
};
