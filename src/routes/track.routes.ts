import { FastifyInstance } from 'fastify';
import { createTickets, deleteAllTickets, fetchAllTickets, getTickets, isEmailRead, pingEmail, summaryOfMail, uniqueIdByReadDetails, userIdByUniqueIds } from '../handlers/track.handlers';
import { readEmailSchema, pingSchema } from '../schemas/track.schema';

export default async function emailTrackingRoutes(fastify: FastifyInstance) {
    fastify.get('/read', {
        handler: isEmailRead,
        schema: readEmailSchema,
    });

    fastify.get('/ping', {
        handler: pingEmail,
        // schema: pingSchema,
    });
    fastify.post('/create', {
        handler: createTickets,
    });
    fastify.get('/tickets-by', {
        handler: getTickets,
    });
    fastify.get('/summary', {
        handler: summaryOfMail,
    });
    fastify.get('/tickets', {
        handler: fetchAllTickets,
    });
    fastify.delete('/tickets', {
        handler: deleteAllTickets,
    })
    fastify.get('/unique-id', {
        handler: userIdByUniqueIds,
    }
    )
    fastify.get('/read-details', {
        handler: uniqueIdByReadDetails,
    })
}
