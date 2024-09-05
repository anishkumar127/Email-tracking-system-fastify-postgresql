import { FastifyInstance } from 'fastify';

export default async function healthCheckRoutes(fastify: FastifyInstance) {
    fastify.get('/health', async (request, reply) => {
        reply.send({ status: 'ok', timestamp: new Date().toISOString() });
    });
}
