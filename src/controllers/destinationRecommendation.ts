import TensorFlow from '../services/tensorFlow'
import UserDestinationRatingModel from '../models/userDestinationRating'
import DestinationModel, { Destination } from '../models/destination'
import { DestinationForRating, DestinationRatingWithDestination, DestinationWithEstimatedRating } from '../types/objects/destinationRating'

class DestinationRecommendationController {
    // Properties

    // Constructor
    constructor() {
    }

    /**
     * @description Estimates the users rating on destination based off of past ratings. 
     * @param {string} userId The string that identifies the user for the database.
     * @returns {DestinationWithEstimatedRating[]} returns the estimated results from the tensor flow machine intelligence algorithm.
     */
    public async listRecommendationForUser(userId: string) {
        const userRatings = await this.getUserRatings(userId)
        if (userRatings.length < 10) {
            throw new Error("User must have at least 10 rated destination.")
        }
        const userDestinationIds = userRatings.map(x => x.destinationId)
        const destinations = await this.getDestinations();
        const nonRatedResults = destinations.filter((x) => !userDestinationIds.includes(x._id.toString()))
        const ratedDestination = destinations.filter((x) => userDestinationIds.includes(x._id.toString()))
        const combinedRatedDestination: DestinationRatingWithDestination[] = ratedDestination.map(x => {
            const result = x as unknown as DestinationRatingWithDestination
            result.rating = userRatings.find(rating => rating.destinationId === x._id.toString())?.rating ?? 0
            return result
        })
        const results = await TensorFlow.determineNewDestinations(nonRatedResults, combinedRatedDestination)
        return results as DestinationWithEstimatedRating[]
    }

    /**
     * @description Queries the database and returns any destinations they have rated. 
     * @param {string} userId The string that identifies the user for the database.
     * @returns {UserDestinationRating[]} returns the users rating for thier destinations. 
     */
    private async getUserRatings(userId: string) {
        return await UserDestinationRatingModel.find({ userId: userId }, null, { lean: true })
    }

    /**
     * @description finds all destinations from mongo and returns them to be put into the machine intelligence algorithm.
     * @returns {DestinationForRating[]} Returns all avaliable destinations from the mongo database. 
     */
    private async getDestinations() {
        let results = await DestinationModel.aggregate([
            {
                '$addFields': {
                    'aquariumCount': {
                        '$size': '$aquariumResults'
                    },
                    'landMarkCount': {
                        '$size': '$landMarkResults'
                    },
                    'museumCount': {
                        '$size': '$museumResults'
                    },
                    'skiingCount': {
                        '$size': '$skiingResults'
                    },
                    'theaterCount': {
                        '$size': '$theaterResults'
                    },
                    'nightLifeCount': {
                        '$size': '$nightLifeResults'
                    },
                    'gamblingCount': {
                        '$size': '$gamblingResults'
                    },
                    'outDoorCount': {
                        '$size': '$outDoorResults'
                    },
                    'zooCount': {
                        '$size': '$zooResults'
                    }
                }
            }, {
                '$project': {
                    '_id': 1,
                    'state': 1,
                    'city': 1,
                    'aquariumCount': 1,
                    'landMarkCount': 1,
                    'museumCount': 1,
                    'skiingCount': 1,
                    'theaterCount': 1,
                    'nightLifeCount': 1,
                    'gamblingCount': 1,
                    'outDoorCount': 1,
                    'zooCount': 1,
                    'restaurantResults': 1
                }
            }
        ]) as DestinationForRating[]
        results = results.map(result => {
            result.fineResturantCount = result.restaurantResults.filter(x => x.type === "Fine Dining").length
            result.casualResturantCount = result.restaurantResults.filter(x => x.type === "Casual Dining").length
            result.barResturantCount = result.restaurantResults.filter(x => x.type === "Bar or Pub").length
            result.restaurantResults = []
            return result
        })
        return results
    }
}

export default new DestinationRecommendationController();