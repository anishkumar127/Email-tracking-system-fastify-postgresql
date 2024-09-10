import axios from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import UAParser from 'ua-parser-js';
import prisma from '../prismaClient';
export const isEmailRead = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { emailId, userId } = request.body as { emailId: string; userId: string };
        console.log('level 1');
        if (!emailId || !userId) {
            return reply.status(400).send({ error: 'Missing emailId or userId' });
        }
        let context;
        try {
            const ip = request.ip;
            const userAgent = request.headers['user-agent'];
            const parser = new UAParser(userAgent);
            const result = parser.getResult();
            const os = result?.os?.name;
            const browser = result?.browser?.name;

            // Retrieve the geolocation information
            const geoResponse = await axios.get(`https://ipinfo.io/${ip}/geo?token=843b85132fe7ea`);
            const { city, region, country } = geoResponse.data;

            // Populate the context object
            context = {
                ip,
                userAgent,
                os,
                browser,
                location: `${city}, ${region}, ${country}`,
            };
        } catch {}
        const currentDate = new Date();
        const tracking = await prisma.tickets.findFirst({
            where: {
                emailId,
                userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (tracking) {
            const payload = {
                isRead: true,
                lastPingAt: currentDate,
                readCounts: {
                    increment: 1,
                },
                ipAddress: context?.ip ?? null,
                location: context?.location ?? null,
                browser: context?.browser ?? null,
                system: context?.os ?? null,
                deviceInfo: context?.userAgent ?? null,
            };
            if (!tracking.readAt) {
                payload['readAt'] = currentDate;
            }
            console.log('readAt', tracking.readAt);
            const now = new Date();
            const isGT30m = tracking.readAt
                ? now.getTime() - new Date(tracking.readAt).getTime() > 30 * 60 * 1000
                : true;
            console.log({ isGT30m });
            if (isGT30m) {
                await prisma.tickets.create({
                    data: {
                        emailId,
                        userId,
                        lastPingAt: now,
                        duration: 0,
                        readCounts: 1,
                        readAt: now,
                        isRead: true,
                        ipAddress: context?.ip ?? null,
                        location: context?.location ?? null,
                        browser: context?.browser ?? null,
                        system: context?.os ?? null,
                        deviceInfo: context?.userAgent ?? null,
                    },
                });
            } else {
                await prisma.tickets.update({
                    where: { id: tracking.id },
                    data: payload,
                });
            }
        } else {
            reply.code(404).send({ error: 'Tracking record not found' });
        }

        return reply.send({
            message: 'Email read successfully',
            success: true,
        });
    } catch (error) {
        console.error('Error tracking email:', error);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

export const pingEmail = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { emailId, userId } = request.body as { emailId: string; userId: string };
        console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
        if (!emailId || !userId) {
            reply.status(400).send({ error: 'Missing emailId or userId' });
            return;
        }

        const pingAt = new Date();

        const tracking = await prisma.tickets.findFirst({
            where: {
                emailId,
                userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (tracking) {
            const lastPingAt = tracking.lastPingAt ? new Date(tracking.lastPingAt) : pingAt;
            const durationIncrement = Math.floor((pingAt.getTime() - lastPingAt.getTime()) / 1000); // Calculate duration increment

            // const durationIncrement = Math.floor((pingAt.getTime() - tracking.lastPingAt.getTime()) / 1000);

            await prisma.tickets.update({
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

        reply.code(201).send({ status: 'ok', message: 'ping success' });
    } catch (error) {
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

/* -------------------------------------------------------------------------- */
/*                               CREATE TICKETS                               */
/* -------------------------------------------------------------------------- */
export const createTickets = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { emailId, userId } = request.body as { emailId: string; userId: string };
        console.log({ emailId, userId });
        await prisma.tickets.create({
            data: {
                emailId,
                userId,
            },
        });
        return reply.code(201).send({
            message: 'ticket send successfully',
        });
    } catch (error) {
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

/* -------------------------------------------------------------------------- */
/*                            FETCH ALL THE TICKETS                           */
/* -------------------------------------------------------------------------- */
export const getTickets = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { emailId, userId } = request.query as { emailId: string; userId: string };
        if (!emailId) {
            reply.code(401).send({ error: 'Missing emailId' });
        }
        const user = await prisma.tickets.findMany({
            where: {
                emailId,
                userId,
            },
        });
        reply.code(200).send({
            user: user,
            message: 'Tickets fetched successfully',
        });
    } catch (error) {
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};
