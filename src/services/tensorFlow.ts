import config from "config"
import * as tf from '@tensorflow/tfjs'
import DestinationModel, { Destination } from "../models/destination";
import { DestinationRatingWithDestination } from "../types/objects/destinationRating";


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
        return await this.performMachineLearning(unRatedDestination, ratedDestinations)
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
        model.add(tf.layers.dense({ units: 1, inputDim: 3 }));

        // Prepare the model for training: Specify the loss and the optimizer.
        model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
        // Generate some synthetic data for training.

        //[action, adventure, romance]
        const xs = tf.tensor2d([[1, 1, 0], [1, 0, 1], [1, 2, 1]]);
        //target data should be rating from 1 to 5
        const ys = tf.tensor2d([[3], [2], [5]]);

        // Train the model using the data.
        await model.fit(xs, ys)
        const result = await model.predict(tf.tensor2d([[1, 0, 0], [1, 0, 3], [1, 5, 0]]))

        // Use the model to do inference on a data point the model hasn't seen before:
    }

}

export default new TensorFlowService();