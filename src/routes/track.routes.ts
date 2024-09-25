import { FastifyInstance } from 'fastify';
import { createTickets, getTickets, isEmailRead, pingEmail, summaryOfMail } from '../handlers/track.handlers';
import { readEmailSchema, pingSchema } from '../schemas/track.schema';

export default async function emailTrackingRoutes(fastify: FastifyInstance) {
    fastify.get('/read', {
        handler: isEmailRead,
        schema: readEmailSchema,
    });

    fastify.put('/ping', {
        handler: pingEmail,
        schema: pingSchema,
    });
    fastify.post('/create', {
        handler: createTickets,
    });
    fastify.get('/tickets', {
        handler: getTickets,
    });
    fastify.get('/summary', {
        handler: summaryOfMail,
    });
}
