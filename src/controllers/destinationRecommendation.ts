import TensorFlow from '../services/tensorFlow'
import UserDestinationRatingModel from '../models/userDestinationRating'

class DestinationRecommendationController {
    // Properties

    // Constructor
    constructor() {
    }

    public async listRecommendationForUser(userId: string) {
        const ratingDestination = await this.getUserRatings(userId)
        if (ratingDestination.length > 10) {
            throw new Error("User must have at least 10 rated destination.")
        }
        return await TensorFlow.determineNewDestinations()
    }

    /**
     * 
     * @param userId 
     * @returns 
     */
    private async getUserRatings(userId: string) {
        return await UserDestinationRatingModel.aggregate([
            {
                '$match': {
                    'userId': userId
                }
            }, {
                '$addFields': {
                    'destinationObjectId': {
                        '$toObjectId': '$destinationId'
                    }
                }
            }, {
                '$lookup': {
                    'from': 'destinations',
                    'localField': 'destinationObjectId',
                    'foreignField': '_id',
                    'as': 'destinationsObject'
                }
            }, {
                '$unwind': {
                    'path': '$destinationsObject',
                    'includeArrayIndex': 'string',
                    'preserveNullAndEmptyArrays': true
                }
            }
        ])
    }

}

export default new DestinationRecommendationController();