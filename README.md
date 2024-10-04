# Email Tracking System with Fastify.js and PostgreSQL

**Email Tracking System** is a modern, scalable mail-tracking solution built with **Fastify.js** and **PostgreSQL**. This application enables tracking of email reads, user details such as IP addresses, location, browser information, and the time spent reading an email. It is designed for efficiency, offering real-time insights into email engagement.

## Key Features

- **Track Email Reads**: Identify how many times an email was read.
- **IP Address Tracking**: Capture the IP address from which the email was accessed.
- **Geolocation**: Determine the location of the user reading the email.
- **Browser & Device Info**: Log detailed browser and device information.
- **Read Duration**: Measure the amount of time users spend reading each email.
- **Timestamps**: Track when an email was first read (`readAt`) and the last ping time (`lastPingAt`).
- **Real-Time Data Updates**: Emails are updated dynamically with read status and tracking details.

## Database Schema

The PostgreSQL schema is defined using Drizzle ORM to manage email tracking details efficiently.

```ts
const tickets = pgTable(
    'tickets',
    {
        id: serial('id').primaryKey(),
        emailId: varchar('email_id', { length: 255 }).notNull(),
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
    }
);
```

### Schema Fields

- `id`: Primary key for the email tracking entry.
- `emailId`: The unique identifier for the email being tracked.
- `userId`: The user identifier who received the email.
- `isRead`: Boolean value indicating whether the email has been read.
- `readAt`: Timestamp for when the email was first read.
- `lastPingAt`: Timestamp for the last time the email was pinged/read.
- `duration`: Time (in seconds) spent reading the email.
- `ipAddress`: The IP address of the user reading the email.
- `location`: The geographic location derived from the IP address.
- `browser`: Information about the browser used to read the email.
- `deviceInfo`: Additional information about the user’s device.
- `system`: Operating system details.
- `createdAt`: Timestamp for when the email entry was created.
- `updatedAt`: Timestamp for the last update to the entry.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/email-tracking-system.git
   cd email-tracking-system
   ```

2. Install dependencies using `pnpm`:

   ```bash
   pnpm install
   ```

3. Set up the PostgreSQL database:

   Ensure your `.env` file is properly configured with the correct database connection URL:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/email_tracking
   ```

4. Run the database migration:

   ```bash
   npm run db:update
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

- **Tracking Read Events**: The application automatically logs read events, capturing details like the user’s IP address, location, and browser info. The `readAt`, `lastPingAt`, and `duration` fields are updated as users interact with emails.
- **Real-Time Insights**: Get real-time information about how users interact with emails, including multiple reads and total read time.

## Available Scripts

Here are the key scripts included in `package.json`:

- `dev`: Starts the development server with **nodemon** for automatic restart on changes.
- `build`: Compiles TypeScript into JavaScript.
- `start`: Runs the application in production.
- `db:update`: Runs Drizzle ORM to generate and migrate database tables.
- `drizzle:studio`: Opens the Drizzle studio for real-time database inspection.
- `release`: Handles version control and tagging using **standard-version**.

```json
"scripts": {
    "dev": "nodemon src/server.ts --traceResolution",
    "build": "tsc",
    "start": "node dist/server.js",
    "format": "prettier --write .",
    "drizzle:generate": "drizzle-kit generate --config=drizzle.config.ts",
    "drizzle:run": "node -r esbuild-register ./migrate.ts",
    "drizzle:migrate": "ts-node ./migrate.ts",
    "drizzle:studio": "drizzle-kit studio",
    "db:update": "npm run drizzle:generate && npm run drizzle:migrate",
    "release": "standard-version",
    "release:push": "standard-version && git push --follow-tags origin main"
}
```

## Technology Stack

- **Fastify.js**: A high-performance web framework for Node.js.
- **PostgreSQL**: Relational database management system for data persistence.
- **Drizzle ORM**: Lightweight and performant ORM for managing SQL databases.
- **TypeScript**: Strongly typed language that builds on JavaScript.
- **Nodemon**: Automatic server restarts during development.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](https://github.com/yourusername/email-tracking-system/issues).

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make the necessary changes and commit them.
4. Push your changes and open a pull request.


## SEO Keywords

- Email Tracking System
- Fastify.js Email Tracking
- PostgreSQL Email Read Tracker
- Real-Time Email Engagement Insights
- Track IP Location of Email Reads
- Email Read Duration Tracking
