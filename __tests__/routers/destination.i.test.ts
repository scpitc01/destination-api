import supertest from 'supertest'
import app from '../../src/app' // Import your Fastify application
import { App } from 'supertest/types'
import DestinationModel from '../../src/models/destination'
import authenticationService from '../../src/services/authentication'

describe('Destination Rating Router', () => {
    let server: App

    beforeAll(async () => {
        // Start the Fastify server
        server = await app.listen({ port: 3000 })
        const authCheck = jest.fn().mockResolvedValue(true)
        jest.spyOn(authenticationService, 'authorizationCheck').mockImplementation(authCheck)
    })

    it('GET /destination/:id/ responds with a 200 and returns object.', async () => {
        const findDestination = jest.fn().mockResolvedValue({ city: 'Louisville', state: 'KY', _id: 'TestID' })
        const serviceFindDestination = jest.spyOn(DestinationModel, 'findById').mockImplementation(findDestination)
        // Create a Supertest request instance
        const request = supertest(server)

        // Send a GET request to the specified route
        const response = await request.get('/destination/TestID')

        // Assert that the response status code is 200
        expect(response.status).toBe(200)
        expect(serviceFindDestination).toHaveBeenCalled()
    })

    afterAll(async () => {
        // Close the Fastify server after all tests have finished
        await app.close()
    })
})
