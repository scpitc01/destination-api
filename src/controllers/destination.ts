import openCageService from '../services/opencage';
import { AddDestinationObject } from '../types/objects/destination';
import { OpenCageResults } from '../types/objects/opencage';


class DestinationController {
    // Properties

    // Constructor
    constructor() {
    }

    public async insertLocation(destinationRequest: AddDestinationObject) {
        const openCageResults: OpenCageResults = await openCageService.retrieveCoordinates(destinationRequest.city, destinationRequest.stateAbbreviation)
        if (openCageResults.results.length) {
            throw new Error("No results found for the requested destination")
        }
    }
}

export default new DestinationController();