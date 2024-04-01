import supertest from 'supertest';
import app from '../../src/app'; // Import your Fastify application
import { App } from 'supertest/types';
import UserModel from '../../src/models/user'
import AuthenticationService from '../../src/services/authentication';
import { after } from 'node:test';


describe('Authentication Router', () => {
    let server: App;

    beforeAll(async () => {
        // Start the Fastify server
        server = await app.listen({ port: 3000 })
    });

    it('/auth/register responds with 200 status code', async () => {
        const createUser = jest.fn().mockResolvedValue({ username: 'Test', password: 'Test' })
        const serviceCreateUser = jest.spyOn(UserModel, 'create').mockImplementation(createUser)
        // Create a Supertest request instance
        const request = supertest(server);

        // Send a GET request to the specified route
        const response = await request.post('/auth/register').send({ username: 'Test', password: 'Test', email: 'Test' });

        // Assert that the response status code is 200
        expect(response.status).toBe(200)
        expect(serviceCreateUser).toHaveBeenCalled()
    })

    it('/auth/login responds with 401 status code', async () => {
        const findUserAsyncMethod = jest.fn().mockResolvedValue(null);
        const serviceFindUser = jest.spyOn(UserModel, 'findOne').mockImplementation(findUserAsyncMethod);
        const salt = await AuthenticationService.generateSalt();
        // Create a Supertest request instance
        const request = supertest(server);

        // Send a GET request to the specified route
        const response = await request.post('/auth/login').send({ username: 'Test', password: 'Fake' });

        // Assert that the response status code is 401
        expect(response.status).toBe(401)
    })

    it('/auth/login responds with 200 status code', async () => {
        const salt = await AuthenticationService.generateSalt();
        const findUser = jest.fn().mockResolvedValue({ _id: 'Test', username: 'Test', password: 'Test', salt: salt })
        const serviceFindUser = jest.spyOn(UserModel, 'findOne').mockImplementation(findUser)
        const verifyPassword = jest.fn().mockReturnValue(true)
        const serviceVerifyPassword = jest.spyOn(AuthenticationService, 'verifyPassword').mockImplementation(verifyPassword)
        // Create a Supertest request instance
        const request = supertest(server);

        // Send a GET request to the specified route
        const response = await request.post('/auth/login').send({ username: 'Test', password: 'Test' });

        // Assert that the response status code is 200
        expect(response.status).toBe(200)
        expect(serviceFindUser).toHaveBeenCalled()
        expect(serviceVerifyPassword).toHaveBeenCalled()
    })

    it('/auth/token/valid responds with 401 status code with a broken auth token', async () => {
        // Create a Supertest request instance
        const request = supertest(server);

        // Send a GET request to the specified route
        const response = await request.get('/auth/token/valid').auth('Token', { type: 'bearer' });

        // Assert that the response status code is 401
        expect(response.status).toBe(401)
    })

    it('/auth/token/valid responds with 401 status code with no auth token', async () => {
        // Create a Supertest request instance
        const request = supertest(server);

        // Send a GET request to the specified route
        const response = await request.get('/auth/token/valid');

        // Assert that the response status code is 401
        expect(response.status).toBe(401)
    })

    it('/auth/token/valid responds with 200 status code with no auth token', async () => {
        const findUser = jest.fn().mockResolvedValue({ _id: 'Test', username: 'Test', password: 'Test' })
        const serviceFindUser = jest.spyOn(UserModel, 'findOne').mockImplementation(findUser)
        const token = AuthenticationService.createJWT('test', 'test')
        // Create a Supertest request instance
        const request = supertest(server);

        // Send a GET request to the specified route
        const response = await request.get('/auth/token/valid').auth(`${token}`, { type: 'bearer' });

        // Assert that the response status code is 401
        expect(response.status).toBe(200)
        expect(serviceFindUser).toHaveBeenCalled()
    })

    afterAll(async () => {
        // Close the Fastify server after all tests have finished
        await app.close()
    });
});
