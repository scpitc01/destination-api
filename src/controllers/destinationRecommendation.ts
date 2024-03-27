import TensorFlow from '../services/tensorFlow'

class DestinationRecommendationController {
    // Properties

    // Constructor
    constructor() {
    }

    public async listRecommendationForUser(userId: string) {
        return await TensorFlow.determineNewDestinations()
    }

}

export default new DestinationRecommendationController();