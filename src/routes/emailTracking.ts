import { FastifyInstance } from 'fastify';
import { trackEmailHandler, pingHandler } from '../handlers/emailTracking';
import { trackEmailSchema, pingSchema } from '../schemas/emailTracking';

export default async function emailTrackingRoutes(fastify: FastifyInstance) {
  fastify.get('/api/v1/track', {
    handler: trackEmailHandler,
    schema: trackEmailSchema,
  });
  
  fastify.post('/api/v1/ping', {
    handler: pingHandler,
    schema: pingSchema,
  });
}
