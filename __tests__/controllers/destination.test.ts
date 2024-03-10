import { Schema } from 'mongoose';
import destinationController from '../../src/controllers/destination'
import destinationModel from '../../src/models/destination';


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
})
