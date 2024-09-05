import { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../prismaClient';
import UAParser from 'ua-parser-js';
import axios from 'axios'
export const isEmailRead = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { emailId, userId } = request.body as { emailId: string; userId: string };
        console.log("level 1")
        if (!emailId || !userId) {
            reply.status(400).send({ error: 'Missing emailId or userId' });
            return;
        }
        let context;
        try {
            const ip = request.ip;
            const userAgent = request.headers['user-agent'];
            const parser = new UAParser(userAgent);
            const result = parser.getResult();
            const os = result?.os?.name; // OS name (e.g., Windows, macOS, Android)
            const browser = result?.browser?.name; // Browser name (e.g., Chrome, Firefox)

            // Retrieve the geolocation information
            const geoResponse = await axios.get(`https://ipinfo.io/${ip}/geo?token=d8688e45222550`);
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
        const tracking = await prisma.user.findFirst({
            where: {
                emailId,
                userId,
            },
        });

        if (tracking) {
            const payload = {
                isRead: true,
                lastPingAt: currentDate,
                readCounts: {
                    increment: 1,
                },
                ipAddress:context?.ip ?? null,
                location: context?.location ?? null,
                browser: context?.browser ?? null,
                system: context?.os ?? null,
                deviceInfo: context?.userAgent ?? null,

            };
            if (!tracking.readAt) {
                payload['readAt'] = currentDate;
            }
            await prisma.user.update({
                where: { id: tracking.id },
                data: payload,
            });
        } else {
            reply.code(404).send({ error: 'Tracking record not found' });
        }

        reply.send({
            message: 'Email read successfully',
            success: true,
        });
        return;
    } catch (error) {
        console.error('Error tracking email:', error);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

export const pingEmail = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { emailId, userId } = request.body as { emailId: string; userId: string };

        if (!emailId || !userId) {
            reply.status(400).send({ error: 'Missing emailId or userId' });
            return;
        }

        const pingAt = new Date();

        const tracking = await prisma.user.findFirst({
            where: {
                emailId,
                userId,
            },
        });

        if (tracking) {
            const lastPingAt = tracking.lastPingAt ? new Date(tracking.lastPingAt) : pingAt;
            const durationIncrement = Math.floor((pingAt.getTime() - lastPingAt.getTime()) / 1000); // Calculate duration increment

            // const durationIncrement = Math.floor((pingAt.getTime() - tracking.lastPingAt.getTime()) / 1000);

            await prisma.user.update({
                where: { id: tracking.id },
                data: {
                    lastPingAt: pingAt,
                    duration: tracking.duration + durationIncrement,
                    readCounts: {
                        increment: 1,
                    },
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

export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { emailId, userId } = request.body as { emailId: string; userId: string };
        const isUserExists = await prisma.user.findFirst({
            where: {
                emailId,
                userId,
            },
        });

        if (isUserExists) {
            reply.code(409).send({ error: 'User already exists' });
            return;
        }

        const user = await prisma.user.create({
            data: {
                emailId,
                userId,
            },
        });
        console.log({ user });
        reply.code(201).send({
            message: 'User created successfully',
        });
        return;
    } catch (error) {
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};


export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { emailId, userId } = request.query as { emailId: string; userId: string };
        console.log("comes")
        const user = await prisma.user.findFirst({
            where: {
                emailId,
                userId,
            },
        });
        reply.code(200).send({
            user: user,
            message: 'User fetched successfully',
        });
        return;
    } catch (error) {
        reply.code(500).send({ error: 'Internal Server Error' });
    }
}