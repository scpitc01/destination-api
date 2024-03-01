import openCageService from '../services/opencage';
import { AddDestinationObject } from '../types/objects/destination';


class DestinationController {
    // Properties

    // Constructor
    constructor() {
    }

    public async insertLocation(destinationRequest: AddDestinationObject) {
        return openCageService.retrieveCoordinates(destinationRequest.city, destinationRequest.stateAbbreviation)
    }
}

export default new DestinationController();