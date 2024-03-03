import openCageService from '../services/opencage'
import hereGeoCoding from '../services/hereGeocoding'
import { AddDestinationObject } from '../types/objects/destination'
import { OpenCageResults } from '../types/objects/opencage'


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
        const hereGeoCodingResturantResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'resturants')
        const hereGeoCodingMuseumResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'museums')
        const hereGeoCodingSkiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'ski')
        const hereGeoCodingLeisureResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'leisure')
        const hereGeoCodingNightLifeResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'Nightlife-Entertainment')
        const hereGeoCodingTheaterResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'Theatre, Music and Culture')
        const hereGeoCodingGamblingResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'casino')
        const hereGeoCodingLandmarksResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'Tourist Attraction')
        const hereGeoCodingZooResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'zoo')
        const hereGeoCodingAquariumResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'aquarium')
        const hereGeoCodingStadiumResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'stadium')
        const hereGeoCodingHotelResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'Hotel or Motel')
        const hereGeoCodingOutdoorResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'Outdoor-Recreation')
        const hereGeoCodingWaterResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'Body of Water')
        const hereGeoCodingHillsResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'Mountain or Hill')
        const hereGeoCodingForestResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'Forest')


        // const amadeusSafteyResults = await amadeusService.locationSafety(location.geometry.lat, location.geometry.lng)
        // const amadeusActivityResults = await amadeusService.locationActivities(location.geometry.lat, location.geometry.lng)
    }
}

export default new DestinationController();