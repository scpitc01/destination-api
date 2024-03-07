import UserDestinationRatingModel, { UserDestinationRating } from '../models/userDestinationRating';

class DestinationRatingController {
    // Properties

    // Constructor
    constructor() {
    }

    /**
     * Inserts or a link between a user and a destination or returns one if they already had one. 
     * @param {UserDestinationRating} ratingRequest The requested link between the user and the destination and the rating they entered. 
     * @returns {UserDestinationRatingModel} returns the link between the user and the destination.
     */
    public async insertDestinationRating(ratingRequest: UserDestinationRating) {
        const result = await UserDestinationRatingModel.findOne({ userId: ratingRequest.userId, destinationId: ratingRequest.destinationId })
        if (result) {
            return result
        }
        else {
            return UserDestinationRatingModel.create(ratingRequest)
        }
    }

    /**
     * Update a link between a user and a destination or returns one if they already had one. 
     * @param {UserDestinationRating} ratingRequest The update link between the user and the destination and the rating they entered. 
     * @returns {UserDestinationRatingModel} returns the updated link between the user and the destination.
     */
    public async updateDestinationRating(ratingRequest: UserDestinationRating) {
        const result = await UserDestinationRatingModel.findOneAndUpdate({ userId: ratingRequest.userId, destinationId: ratingRequest.destinationId }, { $set: { rating: ratingRequest.rating } })
        return result
    }
}

export default new DestinationRatingController();