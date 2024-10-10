import axios from 'axios';
import { and, count, desc, eq, sql } from 'drizzle-orm';
import { FastifyReply, FastifyRequest } from 'fastify';
import UAParser from 'ua-parser-js';
import { db } from '../db/db';
import { tickets } from '../db/schema';
export const isEmailRead = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { emailUniqueId, userId,email } = request.query as { emailUniqueId: string; userId: string ,email:string};
        if (!emailUniqueId || !userId) {
            return reply.status(400).send({ error: 'Missing emailUniqueId or userId' });
        }
        let context;
        try {
            // const ip = request.ip;
            const ip :any =(request.headers['x-forwarded-for'])  || request.headers['x-arr-clientip']  || request.ip || (request.headers['cf-connecting-ip'] as string) ||
            (request.headers['x-real-ip'] as string) ||
            request.socket.remoteAddress ||'';
            
            const userAgent = request.headers['user-agent'];
            const parser = new UAParser(userAgent);
            const result = parser.getResult();
            const os = result?.os?.name;
            const browser = result?.browser?.name;
            const realIp = ip.split(":")[0];
            const geoResponse = await axios.get(`https://ipinfo.io/${realIp}/geo?token=843b85132fe7ea`);
            const { city, region, country } = geoResponse.data;
            context = {
                ip:realIp,
                userAgent,
                os,
                browser,
                location: `${city}, ${region}, ${country}`,
            };
        } catch {}
        const tracking = await db
            .select()
            .from(tickets)
            .where(and(eq(tickets.emailUniqueId, emailUniqueId), eq(tickets.userId, userId)))
            .limit(1);
        if (tracking && tracking?.length > 0) {
                const now = new Date();
            console.log('location', context?.location);
            if (tracking[0].isRead) {
                const schema = {
                    emailUniqueId: emailUniqueId,
                    email:email,
                    userId: userId,
                    isRead: true,
                    readAt: now,
                    lastPingAt: now,
                    duration: 0,
                    ipAddress: context?.ip ?? null,
                    location: context?.location ?? null,
                    browser: context?.browser ?? null,
                    deviceInfo: context?.userAgent ?? null,
                    system: context?.os ?? null,
                };
                await db.insert(tickets).values(schema);
            } else {
                const payload = {
                    emailUniqueId: emailUniqueId,
                    userId: userId,
                    isRead: true,
                    readAt: new Date(),
                    lastPingAt: new Date(),
                    duration: 0,
                    ipAddress: context?.ip ?? null,
                    location: context?.location ?? null,
                    browser: context?.browser ?? null,
                    system: context?.os ?? null,
                    deviceInfo: context?.userAgent ?? null,
                };
                await db.update(tickets).set(payload).where(eq(tickets.id, tracking[0].id));
            }
        } else {
            return reply.code(404).send({ error: 'Tracking record not found' });
        }

        const transparentPixel = Buffer.from(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/ohNYAAAAABJRU5ErkJggg==',
            'base64'
        );
        return reply
            .header('Content-Type', 'image/png')
            .header('Content-Length', transparentPixel.length)
            .send(transparentPixel);
    } catch (error) {
        console.error('Error tracking email:', error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};

export const pingEmail = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { emailUniqueId } = request.query as { emailUniqueId: string };
        if (!emailUniqueId) {
            return reply.status(400).send({ error: 'Missing emailUniqueId' });
        }

        const pingAt = new Date();
        const tracking = await db
            .select()
            .from(tickets)
            .where(and(eq(tickets.emailUniqueId, emailUniqueId)))
            .orderBy(desc(tickets.createdAt))
            .limit(1);

        if (tracking && tracking?.length > 0) {
            const lastPingAt = tracking[0].lastPingAt ? new Date(tracking[0].lastPingAt) : pingAt;
            const durationIncrement = Math.floor((pingAt.getTime() - lastPingAt.getTime()) / 1000); // Calculate duration increment

            // const durationIncrement = Math.floor((pingAt.getTime() - tracking.lastPingAt.getTime()) / 1000);

            const schema = {
                emailUniqueId,
                lastPingAt: pingAt,
                duration: tracking[0].duration + durationIncrement,
            };
            await db.update(tickets).set(schema).where(eq(tickets.id, tracking[0].id));
        } else {
            return reply.status(404).send({ error: 'Tracking record not found' });
        }

        return reply.code(201).send({ status: 'ok', message: 'ping success' });
    } catch (error) {
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};

/* -------------------------------------------------------------------------- */
/*                               CREATE TICKETS                               */
/* -------------------------------------------------------------------------- */
export const createTickets = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { emailUniqueId, userId,email } = request.body as { emailUniqueId: string; userId: string,email:string };
        await db.insert(tickets).values({ emailUniqueId, userId ,email});
        return reply.code(201).send({
            message: 'ticket send successfully',
        });
    } catch (error) {
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};

/* -------------------------------------------------------------------------- */
/*                            FETCH ALL THE TICKETS By emailUniqueId                         */
/* -------------------------------------------------------------------------- */
export const getTickets = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { emailUniqueId } = request.query as { emailUniqueId: string };
        if (!emailUniqueId) {
            return reply.code(401).send({ error: 'Missing emailUniqueId' });
        }
        const user = await db
            .select()
            .from(tickets)
            .where(and(eq(tickets.emailUniqueId, emailUniqueId)));

        return reply.code(200).send({
            user: user,
            message: 'Tickets fetched successfully',
        });
    } catch (error) {
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};

/* -------------------------------------------------------------------------- */
/*              TOTAL TIMES OF READ PARTICULAR EMAIL AND USER ID              */
/* -------------------------------------------------------------------------- */
export const summaryOfMail = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { emailUniqueId } = request.query as { emailUniqueId: string };
        if (!emailUniqueId) {
            return reply.code(401).send({ error: 'Missing emailUniqueId' });
        }
        console.log({emailUniqueId})
        const summary = await db
            .select({
                // userId: tickets.userId,
                read: count(),
             })
            .from(tickets)
            .where(and(eq(tickets.emailUniqueId, emailUniqueId), eq(tickets.isRead, true)))

        return reply.code(200).send({   
            summary: summary,
            message: 'Summary fetched successfully',
        });
    } catch (error) {
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
}


/* -------------------------------------------------------------------------- */
/*                      FETCH ALL THE TICKETS INTO THE DB                     */
/* -------------------------------------------------------------------------- */

export const fetchAllTickets = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const allTickets = await db.select().from(tickets);
        return reply.code(200).send({
            tickets: allTickets,
            message: 'Tickets fetched successfully',
        });
    } catch (error) {
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
}
/* -------------------------------------------------------------------------- */
/*                     DELETE ALL THE TICKETS INTO THE DB                     */
/* -------------------------------------------------------------------------- */
export const deleteAllTickets = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await db.delete(tickets)
        return reply.code(200).send({
            message: 'All tickets deleted successfully',
        });
    } catch (error) {
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
}