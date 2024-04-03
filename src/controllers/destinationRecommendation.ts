import TensorFlow from '../services/tensorFlow'
import UserDestinationRatingModel from '../models/userDestinationRating'
import DestinationModel, { Destination } from '../models/destination'
import UserDestinationRating from '../models/userDestinationRating'
import { DestinationRatingWithDestination } from '../types/objects/destinationRating'

class DestinationRecommendationController {
    // Properties

    // Constructor
    constructor() {
    }

    public async listRecommendationForUser(userId: string) {
        const ratingDestination = await this.getUserRatings(userId)
        // if (ratingDestination.length > 10) {
        //     throw new Error("User must have at least 10 rated destination.")
        // }
        const userRatings = await this.getUserRatings(userId)
        const userDestinationIds = userRatings.map(x => x.destinationId)
        const destinations = await this.getDestinations();
        const nonRatedResults = destinations.filter((x) => !userDestinationIds.includes(x._id.toString()))
        const ratedDestination = destinations.filter((x) => userDestinationIds.includes(x._id.toString()))
        const combinedRatedDestination: DestinationRatingWithDestination[] = ratedDestination.map(x => {
            const result = x as unknown as DestinationRatingWithDestination
            result.rating = userRatings.find(rating => rating.destinationId === x._id.toString())?.rating ?? 0
            return result
        })
        console.log(nonRatedResults)
        console.log(combinedRatedDestination)
        return await TensorFlow.determineNewDestinations()
    }

    /**
     * 
     * @param userId 
     * @returns 
     */
    private async getUserRatings(userId: string) {
        return await UserDestinationRatingModel.find({ userId: userId })
    }

    private async getDestinations() {
        return await DestinationModel.find({}, '_id city state hasZoo hasSkiing hasCasino hasSportStadium hasMuseum hasNightLife hasAquarium hasBeach hasMountains hasOutdoorActivities hasArtisticsPlays hasAmusementPark')
    }
}

export default new DestinationRecommendationController();