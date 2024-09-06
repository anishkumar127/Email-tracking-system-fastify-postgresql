import Fastify from 'fastify';
import emailTrackingRoutes from './routes/track.routes';
import health from './routes/healthCheck';
import loggerPlugin from './plugins/logger';
import errorHandler from './plugins/errorHandler';
import cors from '@fastify/cors';
import pino from 'pino';
import { loggerOptions } from './utils/Loggers';
const fastify = Fastify({
    logger: pino(loggerOptions),
});

const main = async () => {
    try {
        /* -------------------------------------------------------------------------- */
        /*                          Register the CORS plugin                          */
        /* -------------------------------------------------------------------------- */
        fastify.register(cors, {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        });
        /* -------------------------------------------------------------------------- */
        /*                              PLUGINS                                       */
        /* -------------------------------------------------------------------------- */
        await fastify.register(loggerPlugin);
        await fastify.register(errorHandler);
        /* -------------------------------------------------------------------------- */
        /*                               ROUTES                                       */
        /* -------------------------------------------------------------------------- */
        await fastify.register(emailTrackingRoutes, { prefix: '/api/v1' });
        await fastify.register(health, { prefix: '/api/v1' });
        /* -------------------------------------------------------------------------- */
        /*                              SERVER                                        */
        /* -------------------------------------------------------------------------- */
        const port = Number(process.env.PORT) || 3000;
        console.log({ port });

        const address = await fastify.listen({ port: port });
        fastify.log.info(`Server listening at ${address}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
main();
