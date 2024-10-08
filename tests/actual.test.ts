import { eq } from 'drizzle-orm';
import Fastify from 'fastify';
import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { tickets } from '../src/db/schema';
import * as handlers from '../src/handlers/track.handlers';
import { db } from '../src/db/db';
const app = Fastify();

app.get('/read', handlers.isEmailRead);
app.post('/ping', handlers.pingEmail);
app.post('/create', handlers.createTickets);
app.get('/tickets-by', handlers.getTickets);
app.get('/tickets', handlers.fetchAllTickets);

beforeAll(async () => {
    await app.ready();
});

afterAll(async () => {
    await app.close();
});

beforeEach(async () => {
    await db.delete(tickets);
});

describe('Ticket Handlers Integration Tests', () => {
    describe('POST /create', () => {
        it('should create a ticket successfully', async () => {
            const response = await supertest(app.server)
                .post('/create')
                .send({
                    emailUniqueId: '0722a925-f89e-44cc-b2aa-453d53165f42',
                    userId: '5ff06b98-2bc2-47e7-afb9-27a4ec0ce620',
                    email: 'H********M@xzm41.onmicrosoft.com',
                });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({ message: 'ticket send successfully' });

            const tickets = await db.query.tickets.findMany();
            expect(tickets.length).toBe(1);
            expect(tickets[0]).toMatchObject({
                emailUniqueId: '0722a925-f89e-44cc-b2aa-453d53165f42',
                userId: '5ff06b98-2bc2-47e7-afb9-27a4ec0ce620',
            });
        });

        it('should return 500 if there is an error creating a ticket', async () => {
            const response = await supertest(app.server)
                .post('/create')
                .send({ emailUniqueId: null, userId: '5ff06b98-2bc2-47e7-afb9-27a4ec0ce620' }); // Assuming emailUniqueId is required

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('GET /tickets-by', () => {
        it('should fetch tickets successfully', async () => {
            await db
                .insert(tickets)
                .values({
                    emailUniqueId: '0722a925-f89e-44cc-b2aa-453d53165f42',
                    userId: '5ff06b98-2bc2-47e7-afb9-27a4ec0ce620',
                    email: 'H********M@xzm41.onmicrosoft.com',
                });

            const response = await supertest(app.server)
                .get('/tickets-by')
                .query({ emailUniqueId: '0722a925-f89e-44cc-b2aa-453d53165f42' });

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                user: [
                    {
                        emailUniqueId: '0722a925-f89e-44cc-b2aa-453d53165f42',
                        userId: '5ff06b98-2bc2-47e7-afb9-27a4ec0ce620',
                    },
                ],
                message: 'Tickets fetched successfully',
            });
        });

        it('should return 401 if there missing required fields', async () => {
            const response = await supertest(app.server)
                .get('/tickets-by')
                .query({ invalidField: 'invalidValue' });
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error');
        });
    }, 10000);
    describe('GET /tickets', () => {
        it('should fetch all tickets successfully', async () => {
            await db
                .insert(tickets)
                .values({
                    emailUniqueId: '0722a925-f89e-44cc-b2aa-453d53165f42',
                    userId: '5ff06b98-2bc2-47e7-afb9-27a4ec0ce620',
                    email: 'H********M@xzm41.onmicrosoft.com',
                });

            const response = await supertest(app.server).get('/tickets');

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                tickets: [{ emailUniqueId: '0722a925-f89e-44cc-b2aa-453d53165f42' }],
                message: 'Tickets fetched successfully',
            });
        });
    });

    describe('GET /read', () => {
        it('should update email as read', async () => {
            // * giving array as a result using [] desturcting. and only getting the object.
            const [ticket] = await db
                .insert(tickets)
                .values({
                    emailUniqueId: '0722a925-f89e-44cc-b2aa-453d53165f42',
                    userId: '5ff06b98-2bc2-47e7-afb9-27a4ec0ce620',
                    email: 'H********M@xzm41.onmicrosoft.com',
                })
                .returning();
            const response = await supertest(app.server)
                .get('/read')
                .query({
                    emailUniqueId: '0722a925-f89e-44cc-b2aa-453d53165f42',
                    userId: '5ff06b98-2bc2-47e7-afb9-27a4ec0ce620',
                });
            expect(response.status).toBe(200);

            const [updatedTicket] = await db.select().from(tickets).where(eq(tickets.id, ticket.id)).limit(1);
            expect(updatedTicket.readAt).not.toBeNull();
        });

        it('should return 404 if the tracking record is not found', async () => {
            const response = await supertest(app.server)
                .get('/read')
                .query({
                    emailUniqueId: 'notfound@example.com',
                    userId: '5ff06b98-2bc2-47e7-afb9-27a4ec0ce620',
                    email: 'H********M@xzm41.onmicrosoft.com',
                });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Tracking record not found' });
        });
    }, 10000);

    describe('POST /ping', () => {
        it('should update ping data successfully', async () => {
            const schema = {
                emailUniqueId: '0722a925-f89e-44cc-b2aa-453d53165f42',
                userId: '5ff06b98-2bc2-47e7-afb9-27a4ec0ce620',
                lastPingAt: new Date(),
                duration: 100,
            };
            const [ticket] = await db.insert(tickets).values(schema).returning();
            const response = await supertest(app.server)
                .post('/ping')
                .send({
                    emailUniqueId: '0722a925-f89e-44cc-b2aa-453d53165f42',
                    userId: '5ff06b98-2bc2-47e7-afb9-27a4ec0ce620',
                });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({ status: 'ok', message: 'ping success' });

            const [updatedTicket] = await db.select().from(tickets).where(eq(tickets.id, ticket.id)).limit(1);
            expect(updatedTicket.lastPingAt).not.toEqual(ticket.lastPingAt);
        });

        it('should return 404 if tracking record is not found', async () => {
            const response = await supertest(app.server)
                .post('/ping')
                .send({ emailId: 'notfound@example.com', userId: '5ff06b98-2bc2-47e7-afb9-27a4ec0ce620' });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Tracking record not found' });
        });
    });
});
