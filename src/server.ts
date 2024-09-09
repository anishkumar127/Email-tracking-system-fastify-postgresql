import Fastify from 'fastify';
import emailTrackingRoutes from './routes/track.routes';
import health from './routes/healthCheck';
import loggerPlugin from './plugins/logger';
import errorHandler from './plugins/errorHandler';
import cors from '@fastify/cors';
import pino from 'pino';
import { loggerOptions } from './utils/Loggers';
const app = Fastify({
    logger: pino(loggerOptions),
});

const main = async () => {
    try {
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
