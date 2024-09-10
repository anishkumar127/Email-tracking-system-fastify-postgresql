import { sql } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

const tickets = pgTable('tickets', {
    id: serial('id').primaryKey(),
    emailId: varchar('email_id', { length: 255 }).notNull(),
    userId: varchar('user_id', { length: 300 }).notNull(),
    isRead: boolean('is_read').default(false),
    readAt: timestamp('read_at'),
    lastPingAt: timestamp('last_ping_at'),
    duration: integer('duration').notNull().default(0),
    readCounts: integer('read_counts').notNull().default(0),
    ipAddress: varchar('ip_address', { length: 100 }),
    location: varchar('location', { length: 200 }),
    browser: varchar('browser', { length: 100 }),
    deviceInfo: varchar('device_info', { length: 300 }),
    system: varchar('system', { length: 200 }),
    sendDate: timestamp('send_date').default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});
export default tickets;
