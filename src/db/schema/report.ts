import { pgTable, uuid, text, boolean, date, timestamp } from 'drizzle-orm/pg-core';
import users from './users';

 const reports = pgTable('reports', {
  id: uuid('id').primaryKey().defaultRandom(),                  
  userId: uuid('user_id').references(() => users.id).notNull(), 
  reportName: text('report_name').notNull(),
  periodDetails: text('period_details').notNull(),
  created: timestamp('created').notNull(),
  reportKeyName: text('report_key_name').notNull(),
  isArchive: boolean('is_archive').default(false),
  periodOne: text('period_one'),
  periodTwo: text('period_two'),
  periodThree: text('period_three'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export default reports