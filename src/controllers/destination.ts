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

            const poiTypes = [
                'restaurants', 'museums', 'ski', 'leisure', 'Nightlife-Entertainment',
                'Theatre, Music and Culture', 'casino', 'Tourist Attraction', 'zoo',
                'aquarium', 'stadium', 'Hotel or Motel', 'Outdoor-Recreation',
                'Body of Water', 'Mountain or Hill', 'Forest'
            ];
            const poiResults = await Promise.all(poiTypes.map(type => this.retrievePOI(location, type)));

            const newDestination: Destination = {
                city: destinationRequest.city,
                state: destinationRequest.stateAbbreviation,
                hasZoo: this.hasPOI(poiResults[8]),
                hasSkiing: this.hasPOI(poiResults[2]),
                hasCasino: this.hasPOI(poiResults[6]),
                hasSportStadium: this.hasPOI(poiResults[10]),
                hasMuseum: this.hasPOI(poiResults[1]),
                hasNightLife: this.hasPOI(poiResults[4]),
                hasAquarium: this.hasPOI(poiResults[9]),
                hasBeach: poiResults[3].items.some((x: { categories: any[]; }) => x?.categories.some(x => x?.name === 'Beach')),
                hasMountains: this.hasPOI(poiResults[13]),
                hasOutdoorActivities: this.hasPOI(poiResults[12]) || this.hasPOI(poiResults[13]) || this.hasPOI(poiResults[14]),
                hasArtisticsPlays: this.hasPOI(poiResults[5]),
                hasAmusementPark: poiResults[7].items.some((x: { categories: any[]; }) => x?.categories.some(x => x?.name === 'Amusement Park')),
                restaurantResults: hereGeoCoding.convertPointOfInterestResultsForMongo(poiResults[0]),
                museumResults: hereGeoCoding.convertPointOfInterestResultsForMongo(poiResults[1]),
                skiingResults: hereGeoCoding.convertPointOfInterestResultsForMongo(poiResults[2]),
                nightLifeResults: hereGeoCoding.convertPointOfInterestResultsForMongo(poiResults[4]),
                theaterResults: hereGeoCoding.convertPointOfInterestResultsForMongo(poiResults[5]),
                gamblingResults: hereGeoCoding.convertPointOfInterestResultsForMongo(poiResults[6]),
                landMarkResults: hereGeoCoding.convertPointOfInterestResultsForMongo(poiResults[7]),
                zooResults: hereGeoCoding.convertPointOfInterestResultsForMongo(poiResults[8]),
                aquariumResults: hereGeoCoding.convertPointOfInterestResultsForMongo(poiResults[9]),
                stadiumResults: hereGeoCoding.convertPointOfInterestResultsForMongo(poiResults[10]),
                hotelResults: hereGeoCoding.convertPointOfInterestResultsForMongo(poiResults[11]),
                outDoorResults: [...poiResults[12].items, ...poiResults[13].items, ...poiResults[14].items]
                    .map(x => ({ name: x?.title, type: x?.categories[0].name, address: x?.address.label }))
            };

            return await DestinationModel.create(newDestination);

        }
    }

    private async retrievePOI(location: any, type: string) {
        return await hereGeoCoding.retrievePointsOfInterest(location.geometry.lat, location.geometry.lng, type);
    }

    private hasPOI(poiResult: HereApiResults) {
        return poiResult.items.length > 0;
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