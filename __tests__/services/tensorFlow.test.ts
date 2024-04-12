import tensorFlowService from '../../src/services/tensorFlow'
import { Destination } from '../../src/models/destination';
import { DestinationForRating, DestinationRatingWithDestination } from '../../src/types/objects/destinationRating';
const destinationsWithRating = require('../mockObjects/destinationsWithRatings.json')
const destinationsWithoutRating = require('../mockObjects/destinationsWithoutRatings.json')



describe('TensorFlow Service', () => {
    let TensorFlow = tensorFlowService

    it('determineNewDestinations should peform the tensor flow estimated and return results', async () => {
        const result = await tensorFlowService.determineNewDestinations(destinationsWithoutRating as unknown as DestinationForRating[], destinationsWithRating as unknown as DestinationRatingWithDestination[])
        expect(result.length).toBe(10)
        expect(result[0].estimatedRating).toBeDefined()
    })
});
