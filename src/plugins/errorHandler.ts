import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default async function errorHandler(fastify: FastifyInstance) {
    fastify.setErrorHandler((error, request: FastifyRequest, reply: FastifyReply) => {
        fastify.log.error(`Error occurred: ${error.message}`, error);

        if (error.validation) {
            reply.status(400).send({
                error: 'Bad Request',
                message: 'Validation error',
                details: error.validation,
            });
        } else {
            reply.status(500).send({
                error: 'Internal Server Error',
                message: 'Something went wrong',
            });
        }
    });
}
