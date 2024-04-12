import supertest from 'supertest'
import app from '../../src/app' // Import your Fastify application
import { App } from 'supertest/types'
import UserDestinationRatingModel from '../../src/models/userDestinationRating'
import DestinationModel from '../../src/models/destination'
import authenticationService from '../../src/services/authentication'

const destinationRatings = require('../mockObjects/destinationRatings.json')
const destinations = require('../mockObjects/destinations.json')

describe('Destination Recommendation Router', () => {
    let server: App

    beforeAll(async () => {
        // Start the Fastify server
        server = await app.listen({ port: 3000 })
        const authCheck = jest.fn().mockResolvedValue(true)
        jest.spyOn(authenticationService, 'authorizationCheck').mockImplementation(authCheck)
    })

    it('GET /destination/:id/ responds with a 200 and returns object.', async () => {
        const findDestinationRating = jest.fn().mockResolvedValue(destinationRatings)
        const serviceFindRating = jest.spyOn(UserDestinationRatingModel, 'find').mockImplementation(findDestinationRating)
        const findDestination = jest.fn().mockResolvedValue(destinations)
        const serviceFindDestination = jest.spyOn(DestinationModel, 'aggregate').mockImplementation(findDestination)
        const authVerifyUser = jest.fn().mockResolvedValue(true)
        const serviceVerifyUser = jest.spyOn(authenticationService, 'verifyUser').mockImplementation(authVerifyUser)
        // Create a Supertest request instance
        const request = supertest(server)

        // Send a GET request to the specified route
        const response = await request.get('/destination/recommendation/TestId')

        // Assert that the response status code is 200
        expect(response.status).toBe(200)
        expect(serviceFindRating).toHaveBeenCalled()
        expect(serviceFindDestination).toHaveBeenCalled()
        expect(serviceVerifyUser).toHaveBeenCalled()
    })

    afterAll(async () => {
        // Close the Fastify server after all tests have finished
        await app.close()
    })
})
