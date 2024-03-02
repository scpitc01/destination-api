import openCageService from '../services/opencage'
import amadeusService from '../services/amadeus'
import { AddDestinationObject } from '../types/objects/destination'
import { OpenCageResults } from '../types/objects/opencage'
import { AmadeusAuthenticationResponse } from '../types/objects/amadeus'


class DestinationController {
    // Properties

    // Constructor
    constructor() {
    }

    public async insertLocation(destinationRequest: AddDestinationObject) {
        const openCageResults: OpenCageResults = await openCageService.retrieveCoordinates(destinationRequest.city, destinationRequest.stateAbbreviation)
        if (!openCageResults.results.length) {
            throw new Error("No results found for the requested destination")
        }
        const location = openCageResults.results[0]
        const amadeusSafteyResults = await amadeusService.locationSafety(location.geometry.lat, location.geometry.lng)
        const amadeusActivityResults = await amadeusService.locationActivities(location.geometry.lat, location.geometry.lng)
    }
}

export default new DestinationController();