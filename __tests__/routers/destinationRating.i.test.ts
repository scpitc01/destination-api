import supertest from 'supertest';
import app from '../../src/app'; // Import your Fastify application
import { App } from 'supertest/types';
import UserDestinationRatingModel from '../../src/models/userDestinationRating';
import authenticationService from '../../src/services/authentication'

describe('Destination Rating Router', () => {
    let server: App;

    beforeAll(async () => {
        // Start the Fastify server
        server = await app.listen({ port: 3000 })
        const authCheck = jest.fn().mockResolvedValue(true);
        jest.spyOn(authenticationService, 'authorizationCheck').mockImplementation(authCheck);
    });

    it('POST /destination/rating/ responds with a 200 and returns object.', async () => {
        const findDestinationRating = jest.fn().mockResolvedValue({ userId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25 });
        const serviceFindRating = jest.spyOn(UserDestinationRatingModel, 'findOne').mockImplementation(findDestinationRating);
        // Create a Supertest request instance
        const request = supertest(server);

        // Send a GET request to the specified route
        const response = await request.post('/destination/rating/').send({ userId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25 });

        // Assert that the response status code is 401
        expect(response.status).toBe(200)
        expect(serviceFindRating).toHaveBeenCalled()
    })

    it('PATCH /destination/rating/ responds with a 200 and returns object.', async () => {
        const findDestinationRating = jest.fn().mockResolvedValue({ userId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25 });
        const serviceFindRating = jest.spyOn(UserDestinationRatingModel, 'findOneAndUpdate').mockImplementation(findDestinationRating);
        // Create a Supertest request instance
        const request = supertest(server);

        // Send a GET request to the specified route
        const response = await request.patch('/destination/rating/').send({ userId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25 });

        // Assert that the response status code is 401
        expect(response.status).toBe(200)
        expect(serviceFindRating).toHaveBeenCalled()
    })

    afterAll(async () => {
        // Close the Fastify server after all tests have finished
        await app.close()
    });
});
