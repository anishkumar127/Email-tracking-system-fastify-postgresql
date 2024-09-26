
const { pgTable, text, uuid, boolean, integer, timestamp, varchar } = require( 'drizzle-orm/pg-core')

 const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  email: varchar('email',{length:255}).notNull().unique(),
  fullName: varchar('full_name',{length:255}).notNull().default(''),
  adminId: uuid('admin_id').references(() => users.id),
  role: varchar('role').notNull().default('user'),
  subRole: varchar('sub_role').default('unit'),
  avatar: text('avatar').default(''),
  coverImage: text('cover_image').default(''),
  password: varchar('password',{length:255}).notNull(),
  refreshToken: text('refresh_token').default(''),
  userLimit: integer('user_limit').default(0),
  isActive: boolean('is_active').notNull().default(true),
  location: text('location').default(''),
  isVerified: boolean('is_verified').notNull().default(false),
  otp: text('otp').notNull().default(''),
  verifiedDate: timestamp('verified_date'),
  otpExpireTime: timestamp('otp_expire_time').defaultNow().notNull(),
  fingerprintImg: text('fingerprint_img').default(''),
  fingerprintKey: text('fingerprint_key').default(''),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}
);

module.exports = users