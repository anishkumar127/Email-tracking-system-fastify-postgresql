import { FastifyInstance } from 'fastify';
import { createTickets, getTickets, isEmailRead, pingEmail } from '../handlers/track.handlers';
// import { createTickets ,getTickets} from '../handlers/track.handlers copy';
import { readEmailSchema, pingSchema } from '../schemas/track.schema';

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
        handler: createTickets,
    });
    fastify.get('/tickets', {
        handler: getTickets,
    });
}
