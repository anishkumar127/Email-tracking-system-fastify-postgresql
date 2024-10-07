import { sql } from 'drizzle-orm';
import { boolean, index, integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

const tickets = pgTable(
    'tickets',
    {
        id: serial('id').primaryKey(),
        emailUniqueId: varchar('email_unique_id', { length: 500 }).notNull(),
        email:varchar('email', { length: 300 }).default(''), // if setNot null then it will throw error because previously item didn't have the email field so need to define default value.
        // in email field notNull cause issue so first need to migrate without notNull and then again add the notnull and migrate.
        userId: varchar('user_id', { length: 300 }).notNull(),
        isRead: boolean('is_read').default(false),
        readAt: timestamp('read_at'),
        lastPingAt: timestamp('last_ping_at'),
        duration: integer('duration').notNull().default(0),
        ipAddress: varchar('ip_address', { length: 100 }),
        location: varchar('location', { length: 200 }),
        browser: varchar('browser', { length: 100 }),
        deviceInfo: varchar('device_info', { length: 300 }),
        system: varchar('system', { length: 200 }),
        createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
        updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
    },
    (table) => {
        return {
            emailUniqueIdIdx: index('email_unique_id_idx').on(table.emailUniqueId),
            
        };
    }
);
export default tickets;
