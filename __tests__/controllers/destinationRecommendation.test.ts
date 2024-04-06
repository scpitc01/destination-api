import destinationRecommendationController from '../../src/controllers/destinationRecommendation'
import UserDestinationRatingModel from '../../src/models/userDestinationRating'
import DestinationModel from '../../src/models/destination'
import TensorFlowService from '../../src/services/tensorFlow'

const destinationRatings = require('../mockObjects/destinationRatings.json')
const destinations = require('../mockObjects/destinations.json')



describe('Destination Recommendation Controller', () => {
    const DestinationRecommendationController = destinationRecommendationController

    it('listRecommendationForUser should call to database gather information and then call to tensorflow service.', async () => {
        const findDestinationRating = jest.fn().mockResolvedValue(destinationRatings)
        const serviceFindRating = jest.spyOn(UserDestinationRatingModel, 'find').mockImplementation(findDestinationRating)
        const findDestination = jest.fn().mockResolvedValue(destinations)
        const serviceFindDestination = jest.spyOn(DestinationModel, 'find').mockImplementation(findDestination)
        const tensorFlowEstimate = jest.fn().mockResolvedValue([{ estimatedRating: 3, _id: "TestId1" }])
        const serviceEstimate = jest.spyOn(TensorFlowService, 'determineNewDestinations').mockImplementation(tensorFlowEstimate)

        const result = await DestinationRecommendationController.listRecommendationForUser('TestUser')

        expect(serviceFindDestination).toHaveBeenCalled()
        expect(serviceFindRating).toHaveBeenCalled()
        expect(serviceEstimate).toHaveBeenCalled()
        expect(result.length).toBe(1)
    })

    it('listRecommendationForUser should fail with no user ratings', async () => {
        const findDestinationRating = jest.fn().mockResolvedValue([])
        const serviceFindRating = jest.spyOn(UserDestinationRatingModel, 'find').mockImplementation(findDestinationRating)
        try {
            await DestinationRecommendationController.listRecommendationForUser('TestUser')
        }
        catch (err) {
            expect(err).toBeDefined
        }
        expect(serviceFindRating).toHaveBeenCalled()
    })
})
