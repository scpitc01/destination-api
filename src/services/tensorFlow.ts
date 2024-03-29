import config from "config"
import * as tf from '@tensorflow/tfjs'


class TensorFlowService {
    // Constructor
    constructor() {
    }


    public async determineNewDestinations() {
        return await this.performMachineLearning()
    }

    private async performMachineLearning() {
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