import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import env from '../config/env';
const queryString = env.DATABASE_URL as string;
export const connection = postgres(queryString);
import * as schema from './schema/index'; // for type checking
export const db = drizzle(connection, { schema , logger: true,casing:'snake_case'});
