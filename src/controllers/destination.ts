import openCageService from '../services/opencage'
import hereGeoCoding from '../services/hereGeocoding'
import { AddDestinationObject } from '../types/objects/destination'
import { OpenCageResults } from '../types/objects/opencage'
import DestinationModel, { Destination } from '../models/destination';
import { HereApiResults } from '../types/objects/here';



class DestinationController {
    // Properties

    // Constructor
    constructor() {
    }

    /**
     * Finds the destination and information about it to add to the mongo cache.
     * @param {AddDestinationObject} destinationRequest The request to request information about the destination to add to the cache. 
     * @returns {DestinationModel} Returns the found destinationModel
     */
    public async insertLocation(destinationRequest: AddDestinationObject) {
        const destination = await DestinationModel.findOne({ city: destinationRequest.city, state: destinationRequest.stateAbbreviation })
        if (destination) {
            return destination
        }
        else {
            const openCageResults: OpenCageResults = await openCageService.retrieveCoordinates(destinationRequest.city, destinationRequest.stateAbbreviation)
            if (!openCageResults.results.length) {
                throw new Error("No results found for the requested destination")
            }
            const location = openCageResults.results[0]
            const hereGeoCodingResturantResults: HereApiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'resturants')
            const hereGeoCodingMuseumResults: HereApiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'museums')
            const hereGeoCodingSkiResults: HereApiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'ski')
            const hereGeoCodingLeisureResults: HereApiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'leisure')
            const hereGeoCodingNightLifeResults: HereApiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'Nightlife-Entertainment')
            const hereGeoCodingTheaterResults: HereApiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'Theatre, Music and Culture')
            const hereGeoCodingGamblingResults: HereApiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'casino')
            const hereGeoCodingLandmarksResults: HereApiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'Tourist Attraction')
            const hereGeoCodingZooResults: HereApiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'zoo')
            const hereGeoCodingAquariumResults: HereApiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'aquarium')
            const hereGeoCodingStadiumResults: HereApiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'stadium')
            const hereGeoCodingHotelResults: HereApiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'Hotel or Motel')
            const hereGeoCodingOutdoorResults: HereApiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'Outdoor-Recreation')
            const hereGeoCodingWaterResults: HereApiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'Body of Water')
            const hereGeoCodingHillsResults: HereApiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'Mountain or Hill')
            const hereGeoCodingForestResults: HereApiResults = await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, 'Forest')

            let combineOutdoorResults = hereGeoCodingOutdoorResults.items.concat(hereGeoCodingWaterResults.items)
            combineOutdoorResults = combineOutdoorResults.concat(hereGeoCodingHillsResults.items)
            combineOutdoorResults = combineOutdoorResults.concat(hereGeoCodingForestResults.items)

            const newDestination: Destination = {
                city: destinationRequest.city,
                state: destinationRequest.stateAbbreviation,
                hasZoo: hereGeoCodingZooResults.items.length > 0,
                hasSkiing: hereGeoCodingSkiResults.items.length > 0,
                hasCasino: hereGeoCodingGamblingResults.items.length > 0,
                hasSportStadium: hereGeoCodingStadiumResults.items.length > 0,
                hasMuseum: hereGeoCodingMuseumResults.items.length > 0,
                hasNightLife: hereGeoCodingNightLifeResults.items.length > 0,
                hasAquarium: hereGeoCodingAquariumResults.items.length > 0,
                hasBeach: hereGeoCodingLeisureResults.items.some(x => x?.categories.some(x => x?.name === 'Beach')),
                hasMountains: hereGeoCodingHillsResults.items.length > 0,
                hasOutdoorActivities: hereGeoCodingOutdoorResults.items.length > 0 || hereGeoCodingWaterResults.items.length > 0 || hereGeoCodingForestResults.items.length > 0,
                hasArtisticsPlays: hereGeoCodingTheaterResults.items.length > 0,
                hasAmusementPark: hereGeoCodingLandmarksResults.items.some(x => x?.categories.some(x => x?.name === 'Amusement Park')),
                restaurantResults: hereGeoCoding.convertPointOfInterestResultsForMongo(hereGeoCodingResturantResults),
                museumResults: hereGeoCoding.convertPointOfInterestResultsForMongo(hereGeoCodingMuseumResults),
                skiingResults: hereGeoCoding.convertPointOfInterestResultsForMongo(hereGeoCodingSkiResults),
                nightLifeResults: hereGeoCoding.convertPointOfInterestResultsForMongo(hereGeoCodingNightLifeResults),
                theaterResults: hereGeoCoding.convertPointOfInterestResultsForMongo(hereGeoCodingTheaterResults),
                gamblingResults: hereGeoCoding.convertPointOfInterestResultsForMongo(hereGeoCodingGamblingResults),
                landMarkResults: hereGeoCoding.convertPointOfInterestResultsForMongo(hereGeoCodingLandmarksResults),
                zooResults: hereGeoCoding.convertPointOfInterestResultsForMongo(hereGeoCodingZooResults),
                aquariumResults: hereGeoCoding.convertPointOfInterestResultsForMongo(hereGeoCodingAquariumResults),
                stadiumResults: hereGeoCoding.convertPointOfInterestResultsForMongo(hereGeoCodingStadiumResults),
                hotelResults: hereGeoCoding.convertPointOfInterestResultsForMongo(hereGeoCodingHotelResults),
                outDoorResults: combineOutdoorResults.map(x => ({ name: x?.title, type: x?.categories[0].name, address: x?.address.label }))
            }
            return await DestinationModel.create(newDestination)
        }
    }

    /**
     * Retrieves a specific destination by the mongo id. 
     * @param destinationId The mongo id for the destination we are looking to retrieve. 
     * @returns {DestinationModel} The mongo object for the destination.
     */
    public async findLocation(destinationId: string) {
        const result = await DestinationModel.findById(destinationId)
        if (!result) {
            throw new Error("No destination was found by that id")
        }
        return result
    }
}

export default new DestinationController();