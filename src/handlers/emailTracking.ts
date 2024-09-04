import { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../prismaClient';

export const trackEmailHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { emailId, userId } = request.query as { emailId: string; userId: string };

    if (!emailId || !userId) {
      reply.status(400).send({ error: 'Missing emailId or userId' });
      return;
    }

    const readAt = new Date();

    let tracking = await prisma.emailTracking.findFirst({
      where: {
        emailId,
        userId,
      },
    });

    if (!tracking) {
      tracking = await prisma.emailTracking.create({
        data: {
          emailId,
          userId,
          readAt,
          lastPingAt: readAt,
          duration: 0,
        },
      });
    } else {
      await prisma.emailTracking.update({
        where: { id: tracking.id },
        data: {
          lastPingAt: readAt,
        },
      });
    }

    reply
      .header('Content-Type', 'image/gif')
      .send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==', 'base64'));
  } catch (error) {
    console.error('Error tracking email:', error);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export const pingHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { emailId, userId } = request.body as { emailId: string; userId: string };

    if (!emailId || !userId) {
      reply.status(400).send({ error: 'Missing emailId or userId' });
      return;
    }

    const pingAt = new Date();

    const tracking = await prisma.emailTracking.findFirst({
      where: {
        emailId,
        userId,
      },
    });

    if (tracking) {
      const durationIncrement = Math.floor((pingAt.getTime() - tracking.lastPingAt.getTime()) / 1000);

      await prisma.emailTracking.update({
        where: { id: tracking.id },
        data: {
          lastPingAt: pingAt,
          duration: tracking.duration + durationIncrement,
        },
      });
    } else {
      reply.status(404).send({ error: 'Tracking record not found' });
      return;
    }

    reply.send({ status: 'ok' });
  } catch (error) {
    console.error('Error updating email tracking:', error);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};
