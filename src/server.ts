
// import Fastify from 'fastify';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
// const fastify = Fastify({ logger: true });

// // Route to track email opens
// fastify.get('/track', async (request, reply) => {
//   const { emailId, userId } = request.query as { emailId: string; userId: string };

//   // Record the read time and initialize duration
//   const readAt = new Date();
  
//   // Check if there is an existing entry to update or create a new one
//   let tracking = await prisma.emailTracking.findFirst({
//     where: {
//       emailId,
//       userId,
//     },
//   });

//   if (!tracking) {
//     // Create a new tracking record
//     tracking = await prisma.emailTracking.create({
//       data: {
//         emailId,
//         userId,
//         readAt,
//         lastPingAt: readAt,
//         duration: 0,
//       },
//     });
//   } else {
//     // Update the tracking record if it's already there
//     await prisma.emailTracking.update({
//       where: { id: tracking.id },
//       data: {
//         lastPingAt: readAt,
//       },
//     });
//   }

//   // Return a 1x1 pixel image
//   reply
//     .header('Content-Type', 'image/gif')
//     .send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==', 'base64'));
// });

// // <----------------- Route to update duration ---------------------->
// fastify.post('/ping', async (request, reply) => {
//   const { emailId, userId } = request.body as { emailId: string; userId: string };
//   const pingAt = new Date();

//   const tracking = await prisma.emailTracking.findFirst({
//     where: {
//       emailId,
//       userId,
//     },
//   });

//   if (tracking) {
//     const durationIncrement = Math.floor((pingAt.getTime() - tracking.lastPingAt.getTime()) / 1000);

//     // Update the tracking record with new duration and last ping time
//     await prisma.emailTracking.update({
//       where: { id: tracking.id },
//       data: {
//         lastPingAt: pingAt,
//         duration: tracking.duration + durationIncrement,
//       },
//     });
//   }

//   reply.send({ status: 'ok' });
// });

// // Start the Fastify server
// fastify.listen({ port: 3000 }, (err, address) => {
//   if (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
//   fastify.log.info(`Server listening at ${address}`);
// });

import Fastify from 'fastify';
import emailTrackingRoutes from './routes/emailTracking';

const fastify = Fastify({ logger: true });

// Register routes
fastify.register(emailTrackingRoutes);

const start = async () => {
    try {
      await fastify.listen({ port: 3000 })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
start()