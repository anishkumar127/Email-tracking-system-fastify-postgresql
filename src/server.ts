import Fastify from 'fastify';
import emailTrackingRoutes from './routes/track.routes';
import health from './routes/healthCheck';
import loggerPlugin from './plugins/logger';
import errorHandler from './plugins/errorHandler';
import cors from '@fastify/cors';
import pino from 'pino';
import { loggerOptions } from './utils/Loggers';
import dotenv from 'dotenv';
import { db } from './db/db';
import { sql } from 'drizzle-orm';
dotenv.config();
const app = Fastify({
    logger: pino(loggerOptions),
});
async function checkDatabaseConnection(fastify, options) {
    try {
        const startTime = process.hrtime();
        await db.execute(sql`SELECT 1`);
        const endTime = process.hrtime(startTime);

        // Convert the time to milliseconds (seconds * 1e3 + nanoseconds * 1e-6)
        const timeTakenMs = endTime[0] * 1e3 + endTime[1] * 1e-6;

        fastify.log.info(`Database connection successful in ${timeTakenMs.toFixed(3) + ' ms'}`);
    } catch (error) {
        fastify.log.error(`Database connection failed:${error}`);
    }
}
const main = async () => {
    try {
        app.register(checkDatabaseConnection);
        /* -------------------------------------------------------------------------- */
        /*                          Register the CORS plugin                          */
        /* -------------------------------------------------------------------------- */
        app.register(cors, {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        });
        /* -------------------------------------------------------------------------- */
        /*                              PLUGINS                                       */
        /* -------------------------------------------------------------------------- */
        await app.register(loggerPlugin);
        await app.register(errorHandler);
        /* -------------------------------------------------------------------------- */
        /*                               ROUTES                                       */
        /* -------------------------------------------------------------------------- */
        await app.register(emailTrackingRoutes, { prefix: '/api/v1' });
        await app.register(health, { prefix: '/api/v1' });
        /* -------------------------------------------------------------------------- */
        /*                              SERVER                                        */
        /* -------------------------------------------------------------------------- */
        const port = Number(process.env.PORT) || 8080;
        console.log({ port });

        const address = await app.listen({ port: port ,host:'0.0.0.0'});
        app.log.info(`Server listening at ${address}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
main();
