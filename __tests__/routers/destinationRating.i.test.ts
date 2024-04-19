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
        const authVerifyUser = jest.fn().mockResolvedValue(true)
        const serviceVerifyUser = jest.spyOn(authenticationService, 'verifyUser').mockImplementation(authVerifyUser)
        // Create a Supertest request instance
        const request = supertest(server);

        // Send a GET request to the specified route
        const response = await request.post('/destination/rating/').send({ userId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25 });

        // Assert that the response status code is 401
        expect(response.status).toBe(200)
        expect(serviceVerifyUser).toHaveBeenCalled()
        expect(serviceFindRating).toHaveBeenCalled()
    })

    it('PATCH /destination/rating/ responds with a 200 and returns object.', async () => {
        const findDestinationRating = jest.fn().mockResolvedValue({ userId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25 });
        const serviceFindRating = jest.spyOn(UserDestinationRatingModel, 'findOneAndUpdate').mockImplementation(findDestinationRating);
        const authVerifyUser = jest.fn().mockResolvedValue(true)
        const serviceVerifyUser = jest.spyOn(authenticationService, 'verifyUser').mockImplementation(authVerifyUser)
        // Create a Supertest request instance
        const request = supertest(server);

        // Send a GET request to the specified route
        const response = await request.patch('/destination/rating/').send({ userId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25 });

        // Assert that the response status code is 401
        expect(response.status).toBe(200)
        expect(serviceVerifyUser).toHaveBeenCalled()
        expect(serviceFindRating).toHaveBeenCalled()
    })

    it('GET /destination/rating/:userId/:destinationId responds with a 200 and returns object.', async () => {
        const findDestinationRating = jest.fn().mockResolvedValue({ userId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25 });
        const serviceFindRating = jest.spyOn(UserDestinationRatingModel, 'findOne').mockImplementation(findDestinationRating);
        const authVerifyUser = jest.fn().mockResolvedValue(true)
        const serviceVerifyUser = jest.spyOn(authenticationService, 'verifyUser').mockImplementation(authVerifyUser)
        // Create a Supertest request instance
        const request = supertest(server);

        // Send a GET request to the specified route
        const response = await request.get('/destination/rating/65e50a396c69ace0de368e13/65e50a396c69ace0de368e13').send();

        // Assert that the response status code is 200
        expect(response.status).toBe(200)
        expect(serviceVerifyUser).toHaveBeenCalled()
        expect(serviceFindRating).toHaveBeenCalled()
    })

    it('GET /destination/rating/:userId responds with a 200 and returns arry.', async () => {
        const listDestinationRating = jest.fn().mockResolvedValue([{ useId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25, destinationsObject: { state: 'KY', city: 'Louisville' } }])
        const serviceListRating = jest.spyOn(UserDestinationRatingModel, 'aggregate').mockImplementation(listDestinationRating)
        const authVerifyUser = jest.fn().mockResolvedValue(true)
        const serviceVerifyUser = jest.spyOn(authenticationService, 'verifyUser').mockImplementation(authVerifyUser)
        // Create a Supertest request instance
        const request = supertest(server);

        // Send a GET request to the specified route
        const response = await request.get('/destination/rating/65e50a396c69ace0de368e13').send();

        // Assert that the response status code is 200
        expect(response.status).toBe(200)
        expect(serviceListRating).toHaveBeenCalled()
        expect(serviceVerifyUser).toHaveBeenCalled()
        expect(serviceListRating).toHaveProperty('length')
    })

    it('DELETE /destination/rating/:userId/:destinationId responds with a 200 tries to delete', async () => {
        const deleteDestinationRating = jest.fn().mockResolvedValue(null)
        const serviceDeleteRating = jest.spyOn(UserDestinationRatingModel, 'deleteOne').mockImplementation(deleteDestinationRating)
        const authVerifyUser = jest.fn().mockResolvedValue(true)
        const serviceVerifyUser = jest.spyOn(authenticationService, 'verifyUser').mockImplementation(authVerifyUser)
        // Create a Supertest request instance
        const request = supertest(server);

        // Send a GET request to the specified route
        const response = await request.delete('/destination/rating/testId/65e50a396c69ace0de368e13').send();

        // Assert that the response status code is 200
        expect(response.status).toBe(200)
        expect(serviceDeleteRating).toHaveBeenCalled()
        expect(serviceVerifyUser).toHaveBeenCalled()
    })

    afterAll(async () => {
        // Close the Fastify server after all tests have finished
        await app.close()
    });
});
