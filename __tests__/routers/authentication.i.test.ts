import supertest from 'supertest';
import app from '../../src/app'; // Import your Fastify application
import { App } from 'supertest/types';

describe('Authentication Router', () => {
    let server: App;

    beforeAll(async () => {
        // Start the Fastify server
        server = await app.listen({ port: 3000 })
    });

    it('/auth/token/valid responds with 401 status code with no auth token', async () => {
        // Create a Supertest request instance
        const request = supertest(server);

        // Send a GET request to the specified route
        const response = await request.get('/auth/token/valid');

        // Assert that the response status code is 401
        expect(response.status).toBe(401)
    })

    afterAll(async () => {
        // Close the Fastify server after all tests have finished
        await app.close()
    });
});
