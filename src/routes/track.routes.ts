import { FastifyInstance } from 'fastify';
import { createUser, getUser, isEmailRead, pingEmail } from '../handlers/track.handlers';
import { readEmailSchema, pingSchema } from '../schemas/emailTracking';

export default async function emailTrackingRoutes(fastify: FastifyInstance) {
    fastify.put('/read', {
        handler: isEmailRead,
        schema: readEmailSchema,
    });

    fastify.put('/ping', {
        handler: pingEmail,
        schema: pingSchema,
    });
    fastify.post('/create', {
        handler: createUser,
    });
    fastify.get('/user', {
        handler: getUser,
    });
}
