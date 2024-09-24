import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();
const queryString = process.env.DATABASE_URL_TEST as string;
console.log({queryString})
export const connection = postgres(queryString);
import * as schema from '../src/db/schema/index'; // for type checking
console.log({connection})
export const test_DB = drizzle(connection, { schema });
