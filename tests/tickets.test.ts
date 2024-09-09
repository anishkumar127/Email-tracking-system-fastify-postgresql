import Fastify from 'fastify';
import supertest from 'supertest';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import * as handlers from '../src/handlers/track.handlers'; // Adjust the import path based on your project structure
import prisma from '../src/prismaClient';
const app = Fastify();

app.post('/read', handlers.isEmailRead);
app.post('/ping', handlers.pingEmail);
app.post('/create', handlers.createTickets);
app.get('/tickets', handlers.getTickets);

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe('Ticket Handlers Integration Tests', () => {
  describe('POST /create', () => {
    it('should create a ticket successfully', async () => {
      prisma.tickets.create = vi.fn().mockResolvedValueOnce({ id: 1, emailId: 'test@example.com', userId: '123' });

      const response = await supertest(app.server)
        .post('/create')
        .send({ emailId: 'test@example.com', userId: '123' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'ticket send successfully' });
    });

    it('should return 500 if there is an error creating a ticket', async () => {
      prisma.tickets.create = vi.fn().mockRejectedValueOnce(new Error('Database error'));

      const response = await supertest(app.server)
        .post('/create')
        .send({ emailId: 'test@example.com', userId: '123' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('GET /tickets', () => {
    it('should fetch tickets successfully', async () => {
      prisma.tickets.findMany = vi.fn().mockResolvedValueOnce([{ emailId: 'test@example.com', userId: '123' }]);

      const response = await supertest(app.server)
        .get('/tickets')
        .query({ emailId: 'test@example.com' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        user: [{ emailId: 'test@example.com', userId: '123' }],
        message: 'Tickets fetched successfully',
      });
    });

    it('should return 500 if there is an error fetching tickets', async () => {
      prisma.tickets.findMany = vi.fn().mockRejectedValueOnce(new Error('Database error'));

      const response = await supertest(app.server)
        .get('/tickets')
        .query({ emailId: 'test@example.com' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('POST /read', () => {
    it('should update email as read', async () => {
      prisma.tickets.findFirst = vi.fn().mockResolvedValueOnce({ id: 1, readAt: null });
      prisma.tickets.update = vi.fn().mockResolvedValueOnce({});

      const response = await supertest(app.server)
        .post('/read')
        .send({ emailId: 'test@example.com', userId: '123' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Email read successfully', success: true });
    });

    it('should return 404 if the tracking record is not found', async () => {
      prisma.tickets.findFirst = vi.fn().mockResolvedValueOnce(null);

      const response = await supertest(app.server)
        .post('/read')
        .send({ emailId: 'test@example.com', userId: '123' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Tracking record not found' });
    });
  });

  describe('POST /ping', () => {
    it('should update ping data successfully', async () => {
      prisma.tickets.findFirst = vi.fn().mockResolvedValueOnce({ id: 1, lastPingAt: new Date(), duration: 100 });
      prisma.tickets.update = vi.fn().mockResolvedValueOnce({});

      const response = await supertest(app.server)
        .post('/ping')
        .send({ emailId: 'test@example.com', userId: '123' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ status: 'ok', message: 'ping success' });
    });

    it('should return 404 if tracking record is not found', async () => {
      prisma.tickets.findFirst = vi.fn().mockResolvedValueOnce(null);

      const response = await supertest(app.server)
        .post('/ping')
        .send({ emailId: 'test@example.com', userId: '123' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Tracking record not found' });
    });
  });
});
