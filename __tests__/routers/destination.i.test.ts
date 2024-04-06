import supertest from 'supertest'
import app from '../../src/app' // Import your Fastify application
import { App } from 'supertest/types'
import destinationModel from '../../src/models/destination';
import opencageService from '../../src/services/opencage';
import hereGeocodingService from '../../src/services/hereGeocoding';
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
        const serviceFindDestination = jest.spyOn(destinationModel, 'findById').mockImplementation(findDestination)
        // Create a Supertest request instance
        const request = supertest(server)

        // Send a GET request to the specified route
        const response = await request.get('/destination/TestID')

        // Assert that the response status code is 200
        expect(response.status).toBe(200)
        expect(serviceFindDestination).toHaveBeenCalled()
    })

    it('POST /destination responds with a 200 and returns object.', async () => {
        const findDestination = jest.fn().mockResolvedValue(null);
        const serviceFindDestination = jest.spyOn(destinationModel, 'findOne').mockImplementation(findDestination);
        const retrieveCoordinates = jest.fn().mockResolvedValue({ results: [{ geometry: { lat: 30, ln: 40 } }] });
        const serviceRetrieveCoordinates = jest.spyOn(opencageService, 'retrieveCoordinates').mockImplementation(retrieveCoordinates);
        const retrievePointsOfInterest = jest.fn().mockResolvedValue({ items: [{ title: 'Test1', distance: 50, categories: [{ name: 'Test', primary: true }], address: { label: 'Test Address' } }] });
        const serviceRetrievePointsOfInterest = jest.spyOn(hereGeocodingService, 'retrievePointsOfInterest').mockImplementation(retrievePointsOfInterest);
        const createDestination = jest.fn().mockResolvedValue(null);
        const serviceCreateDestination = jest.spyOn(destinationModel, 'create').mockImplementation(createDestination);
        // Create a Supertest request instance
        const request = supertest(server)

        // Send a GET request to the specified route
        const response = await request.post('/destination').send({
            "city": 'Louisville',
            "stateAbbreviation": 'KY'
        })

        // Assert that the response status code is 200
        expect(response.status).toBe(200)
        expect(serviceFindDestination).toHaveBeenCalled()
        expect(serviceFindDestination).toHaveBeenCalled()
        expect(serviceRetrieveCoordinates).toHaveBeenCalled()
        expect(serviceRetrievePointsOfInterest).toHaveBeenCalled()
        expect(serviceCreateDestination).toHaveBeenCalled()
    })

    afterAll(async () => {
        // Close the Fastify server after all tests have finished
        await app.close()
    })
})
