import { Schema } from 'mongoose';
import destinationController from '../../src/controllers/destination'
import destinationModel from '../../src/models/destination';
import opencageService from '../../src/services/opencage';
import hereGeocodingService from '../../src/services/hereGeocoding';


describe('Destination Controller', () => {
    const DestinationController = destinationController
    it('findLocation should respond with a destination object', async () => {
        const findDestination = jest.fn().mockResolvedValue({ city: 'Louisville', state: 'KY', _id: 'testId' });
        const serviceFindDestination = jest.spyOn(destinationModel, 'findById').mockImplementation(findDestination);

        const destination = await DestinationController.findLocation('testId')
        expect(destination).toBeDefined()
        expect(serviceFindDestination).toHaveBeenCalled()
    })

    it('findLocation should respond with an error', async () => {
        const findDestination = jest.fn().mockResolvedValue(null);
        const serviceFindDestination = jest.spyOn(destinationModel, 'findById').mockImplementation(findDestination);
        try {
            await DestinationController.findLocation('testId')
        }
        catch (err) {
            expect(err).toBeDefined()
            expect(serviceFindDestination).toHaveBeenCalled()
        }
    })

    it('insertLocation should respond with a destination in mongo', async () => {
        const findDestination = jest.fn().mockResolvedValue({ _id: 'Test' });
        const serviceFindDestination = jest.spyOn(destinationModel, 'findOne').mockImplementation(findDestination);
        const result = await DestinationController.insertLocation({ city: 'Louisville', stateAbbreviation: 'KY' })

        expect(serviceFindDestination).toHaveBeenCalled()
        expect(result._id).toBe('Test')
    })

    it('insertLocation should fail with no useable reponse from opencage', async () => {
        const findDestination = jest.fn().mockResolvedValue(null);
        const serviceFindDestination = jest.spyOn(destinationModel, 'findOne').mockImplementation(findDestination);
        const retrieveCoordinates = jest.fn().mockResolvedValue({ results: null });
        const serviceRetrieveCoordinates = jest.spyOn(opencageService, 'retrieveCoordinates').mockImplementation(retrieveCoordinates);

        try {
            const result = await DestinationController.insertLocation({ city: 'Louisville', stateAbbreviation: 'KY' })
        }
        catch (err) {
            expect(err).toBeDefined()
        }

        expect(serviceFindDestination).toHaveBeenCalled()
        expect(serviceRetrieveCoordinates).toHaveBeenCalled()
    })

    it('insertLocation should succeed', async () => {
        const findDestination = jest.fn().mockResolvedValue(null);
        const serviceFindDestination = jest.spyOn(destinationModel, 'findOne').mockImplementation(findDestination);
        const retrieveCoordinates = jest.fn().mockResolvedValue({ results: [{ geometry: { lat: 30, ln: 40 } }] });
        const serviceRetrieveCoordinates = jest.spyOn(opencageService, 'retrieveCoordinates').mockImplementation(retrieveCoordinates);
        const retrievePointsOfInterest = jest.fn().mockResolvedValue({ items: [{ title: 'Test1', distance: 50, categories: [{ name: 'Test', primary: true }], address: { label: 'Test Address' } }] });
        const serviceRetrievePointsOfInterest = jest.spyOn(hereGeocodingService, 'retrievePointsOfInterest').mockImplementation(retrievePointsOfInterest);
        const createDestination = jest.fn().mockResolvedValue(null);
        const serviceCreateDestination = jest.spyOn(destinationModel, 'create').mockImplementation(createDestination);

        const result = await DestinationController.insertLocation({ city: 'Louisville', stateAbbreviation: 'KY' })

        expect(serviceFindDestination).toHaveBeenCalled()
        expect(serviceRetrieveCoordinates).toHaveBeenCalled()
        expect(serviceRetrievePointsOfInterest).toHaveBeenCalled()
        expect(serviceCreateDestination).toHaveBeenCalled()
    })
})
