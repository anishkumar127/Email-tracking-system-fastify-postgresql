import { FastifyInstance } from 'fastify';
import { trackEmailHandler, pingHandler, createUser } from '../handlers/emailTracking';
import { trackEmailSchema, pingSchema } from '../schemas/emailTracking';

export default async function emailTrackingRoutes(fastify: FastifyInstance) {
    fastify.get('/track', {
        handler: trackEmailHandler,
        schema: trackEmailSchema,
    });

    fastify.post('/ping', {
        handler: pingHandler,
        schema: pingSchema,
    });
    fastify.post('/create', {
        handler:createUser
    })
}
