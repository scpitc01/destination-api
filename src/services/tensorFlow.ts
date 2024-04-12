import config from "config"
import * as tf from '@tensorflow/tfjs'
import DestinationModel, { Destination } from "../models/destination";
import { DestinationForRating, DestinationRatingWithDestination, DestinationWithEstimatedRating } from "../types/objects/destinationRating";


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
    public async determineNewDestinations(unRatedDestination: DestinationForRating[], ratedDestinations: DestinationRatingWithDestination[]) {
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
    private async performMachineLearning(unRatedDestination: DestinationForRating[], ratedDestinations: DestinationRatingWithDestination[]) {
        // Define a model for linear regression.
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputDim: 12 }));
        const learningRate = 0.0001;
        const optimizer = tf.train.sgd(learningRate);

        // Prepare the model for training: Specify the loss and the optimizer.
        model.compile({
            loss: "meanSquaredError",
            optimizer: "sgd",
            metrics: ["mse"]
        });
        // Generate some synthetic data for training.

        const xs = tf.tensor2d(this.getPointsOfInterestsArray(ratedDestinations));
        //target data should be rating from 1 to 5
        const ys = tf.tensor2d(this.getRatingArray(ratedDestinations));

        // Train the model using the data.
        await model.fit(xs, ys, { batchSize: 10, epochs: 1000 })
        const result = await model.predict(tf.tensor2d(this.getPointsOfInterestsArray(unRatedDestination))) as tf.Tensor
        return result.data()
    }

    /**
     * @description Converts destinations to arrays with number to stick into tensor flow. 
     * @param destinations The destinations we are trying to convert to stick into tensor flow. 
     * @returns {number[][]}
     */
    private getPointsOfInterestsArray(destinations: DestinationForRating[]) {
        const destinationArray = []
        for (const destination of destinations) {
            destinationArray.push([destination.aquariumCount / 100, destination.barResturantCount / 100, destination.casualResturantCount / 100, destination.fineResturantCount / 100, destination.gamblingCount / 100, destination.landMarkCount / 100, destination.museumCount / 100, destination.nightLifeCount / 100, destination.outDoorCount / 100, destination.skiingCount / 100, destination.theaterCount / 100, destination.zooCount / 100])
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