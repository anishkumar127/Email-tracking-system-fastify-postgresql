import { FastifyInstance } from 'fastify';
import { createUser, isEmailRead, pingEmail } from '../handlers/track.handlers';
import { trackEmailSchema, pingSchema } from '../schemas/emailTracking';

export default async function emailTrackingRoutes(fastify: FastifyInstance) {
    fastify.get('/track', {
        handler: isEmailRead,
        schema: trackEmailSchema,
    });

    fastify.post('/ping', {
        handler: pingEmail,
        schema: pingSchema,
    });
    fastify.post('/create', {
        handler: createUser,
    });
}
