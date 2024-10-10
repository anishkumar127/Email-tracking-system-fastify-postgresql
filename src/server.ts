import cors from '@fastify/cors';
import { sql } from 'drizzle-orm';
import Fastify from 'fastify';
import env from './config/env';
import { db } from './db/db';
import errorHandler from './plugins/errorHandler';
import loggerPlugin from './plugins/logger';
import health from './routes/healthCheck';
import emailTrackingRoutes from './routes/track.routes';
const app = Fastify({
    logger: true,
    trustProxy: true
});
async function checkDatabaseConnection() {
    try {
        const startTime = process.hrtime();
        await db.execute(sql`SELECT 1`);
        const endTime = process.hrtime(startTime);

        // Convert the time to milliseconds (seconds * 1e3 + nanoseconds * 1e-6)
        const timeTakenMs = endTime[0] * 1e3 + endTime[1] * 1e-6;

        app.log.info(`Database connection successful in ${timeTakenMs.toFixed(3) + ' ms'}`);
    } catch (error) {
        app.log.error(`Database connection failed:${error}`);
    }
}
const main = async () => {
    try {
        await checkDatabaseConnection();
        /* -------------------------------------------------------------------------- */
        /*                          Register the CORS plugin                          */
        /* -------------------------------------------------------------------------- */
        await app.register(cors, {
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
        const port = Number(env.PORT) || 3000;
        console.log({ port });

        const address = await app.listen({ port: port, host: '0.0.0.0' });
        app.log.info(`Server listening at ${address}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
main();
