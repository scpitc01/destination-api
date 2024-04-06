import config from "config"
import * as tf from '@tensorflow/tfjs'
import DestinationModel, { Destination } from "../models/destination";
import { DestinationRatingWithDestination, DestinationWithEstimatedRating } from "../types/objects/destinationRating";


class TensorFlowService {
    // Constructor
    constructor() {
    }

    /**
     * @description Helper function to determine estimated rating for the user will return the 10 estimated ratings.
     * @param unRatedDestination Unrated destinations by the user these will be given estimated rating and the top 10 will be returned.
     * @param ratedDestinations Rated destinations by the user these will be used to determine the estimated ratings.
     * @returns 
     */
    public async determineNewDestinations(unRatedDestination: Destination[], ratedDestinations: DestinationRatingWithDestination[]) {
        const results = await this.performMachineLearning(unRatedDestination, ratedDestinations)
        const estimatedDestination = unRatedDestination as unknown as DestinationWithEstimatedRating[]

        for (const index in estimatedDestination) {
            estimatedDestination[index] = estimatedDestination[index]
            estimatedDestination[index].estimatedRating = results[index]
        }
        const recommenedDestinations = estimatedDestination.sort((a, b) => b.estimatedRating - a.estimatedRating)
        return recommenedDestinations.slice(0, 10)
    }

    /**
     * @description Machine intelligence function that determines the highest ratings for unrated destinations
     * @param unRatedDestination Unrated destinations by the user these will be given estimated rating and the top 10 will be returned.
     * @param ratedDestinations Rated destinations by the user these will be used to determine the estimated ratings.
     * @returns 
     */
    private async performMachineLearning(unRatedDestination: Destination[], ratedDestinations: DestinationRatingWithDestination[]) {
        // Define a model for linear regression.
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputDim: 12 }));

        // Prepare the model for training: Specify the loss and the optimizer.
        model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
        // Generate some synthetic data for training.

        const xs = tf.tensor2d(this.getPointsOfInterestsArray(ratedDestinations));
        //target data should be rating from 1 to 5
        const ys = tf.tensor2d(this.getRatingArray(ratedDestinations));

        // Train the model using the data.
        await model.fit(xs, ys, { epochs: 50 })
        const result = await model.predict(tf.tensor2d(this.getPointsOfInterestsArray(unRatedDestination))) as tf.Tensor
        return result.data()
    }

    /**
     * @description Converts destinations to arrays with number to stick into tensor flow. 
     * @param destinations The destinations we are trying to convert to stick into tensor flow. 
     * @returns {number[][]}
     */
    private getPointsOfInterestsArray(destinations: Destination[]) {
        const destinationArray = []
        for (const destination of destinations) {
            destinationArray.push([destination.hasAmusementPark ? 1 : 0, destination.hasArtisticsPlays ? 1 : 0, destination.hasArtisticsPlays ? 1 : 0, destination.hasBeach ? 1 : 0, destination.hasCasino ? 1 : 0, destination.hasMountains ? 1 : 0, destination.hasMuseum ? 1 : 0, destination.hasNightLife ? 1 : 0, destination.hasOutdoorActivities ? 1 : 0, destination.hasSkiing ? 1 : 0, destination.hasSportStadium ? 1 : 0, destination.hasZoo ? 1 : 0])
        }
        return destinationArray
    }

    /**
     * @description Converts destinations to arrays with number to stick into tensor flow. 
     * @param destinations The destinations we are trying to convert to stick into tensor flow. 
     * @returns {number[][]}
     */
    private getRatingArray(destinations: DestinationRatingWithDestination[]) {
        const destinationArray = []
        for (const destination of destinations) {
            destinationArray.push([destination.rating])
        }
        return destinationArray
    }

}

export default new TensorFlowService();