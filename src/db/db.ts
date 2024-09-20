import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();
const queryString = process.env.DATABASE_URL as string;
export const connection = postgres(queryString);
import * as schema from './schema/index'; // for type checking
export const db = drizzle(connection, { schema });
