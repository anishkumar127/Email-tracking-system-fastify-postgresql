import Fastify from 'fastify';
import emailTrackingRoutes from './routes/track.routes';
import health from './routes/healthCheck';
import loggerPlugin from './plugins/logger';
import errorHandler from './plugins/errorHandler';
import cors from '@fastify/cors';
import pino from 'pino';
import { loggerOptions } from './utils/Loggers';
import prisma from './prismaClient';
const app = Fastify({
    logger: pino(loggerOptions),
});
async function checkDatabaseConnection(fastify, options) {
    try {
        await prisma.$connect();
        fastify.log.info('Database connection successful');
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
        const port = Number(process.env.PORT) || 3000;
        console.log({ port });

        const address = await app.listen({ port: port });
        app.log.info(`Server listening at ${address}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
main();
