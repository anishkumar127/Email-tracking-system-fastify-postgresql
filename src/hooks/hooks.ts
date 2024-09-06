import { FastifyInstance } from 'fastify';

export default async function loggerPlugin(fastify: FastifyInstance) {
    // Hook to log incoming requests
    fastify.addHook('onRequest', async (request) => {
        fastify.log.info(`Incoming request: ${request.method} ${request.url}`);
    });

    // Hook to log responses
    fastify.addHook('onResponse', async (request, reply) => {
        fastify.log.info(
            `Response sent: ${reply.statusCode} ${request.method} ${request.url} $${reply.elapsedTime}`
        );
    });
}
