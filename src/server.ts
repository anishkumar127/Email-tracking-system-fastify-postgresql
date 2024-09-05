import Fastify from 'fastify';
import emailTrackingRoutes from './routes/track.routes';
import health from './routes/healthCheck';
import loggerPlugin from './plugins/logger';
import errorHandler from './plugins/errorHandler';
import cors from '@fastify/cors';
const fastify = Fastify({ logger: true });

const start = async () => {
    try {
        // Register the CORS plugin
        fastify.register(cors, {
            origin: '*', 
            methods: ['GET', 'POST', 'PUT', 'DELETE'], 
            allowedHeaders: ['Content-Type', 'Authorization'], 
            credentials: true, 
        });
        // Register plugins
        await fastify.register(loggerPlugin);
        await fastify.register(errorHandler);
        // Register routes
        await fastify.register(emailTrackingRoutes, { prefix: '/api/v1' });
        await fastify.register(health, { prefix: '/api/v1' });
        // start server
        const port = Number(process.env.PORT) || 3000;
        console.log({ port });

        const address = await fastify.listen({ port: port });
        fastify.log.info(`Server listening at ${address}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
