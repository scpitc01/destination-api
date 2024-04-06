import TensorFlow from '../services/tensorFlow'
import UserDestinationRatingModel from '../models/userDestinationRating'
import DestinationModel, { Destination } from '../models/destination'
import { DestinationRatingWithDestination } from '../types/objects/destinationRating'

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
        return await TensorFlow.determineNewDestinations(nonRatedResults, combinedRatedDestination)
    }

    /**
     * @description Queries the database and returns any destinations they have rated. 
     * @param {string} userId The string that identifies the user for the database.
     * @returns {UserDestinationRating[]} returns the users rating for thier destinations. 
     */
    private async getUserRatings(userId: string) {
        return await UserDestinationRatingModel.find({ userId: userId })
    }

    /**
     * @description finds all destinations from mongo and returns them to be put into the machine intelligence algorithm.
     * @returns {Destination[]} Returns all avaliable destinations from the mongo database. 
     */
    private async getDestinations() {
        return await DestinationModel.find({}, '_id city state hasZoo hasSkiing hasCasino hasSportStadium hasMuseum hasNightLife hasAquarium hasBeach hasMountains hasOutdoorActivities hasArtisticsPlays hasAmusementPark')
    }
}

export default new DestinationRecommendationController();