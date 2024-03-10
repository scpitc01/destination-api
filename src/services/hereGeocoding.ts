import config from "config";
import axios from "axios";
import { HereApiResults } from "../types/objects/here";

class HereGeocodingService {
    // Properties
    private url = ''
    private key = ''
    private maxDistance = 48281
    // Constructor
    constructor(url: string, key: string) {
        this.key = key
        this.url = url
    }

    /**
         * Determines points of interests for the location. 
         * @param {string} latitude The city you are currently trying to look up. 
         * @param {string} longitude The state abbreviation for the location you are trying to look up.
         * @param {string} type The type of point on interest you are going to be looking for. 
         * @returns {Promise<HereApiResults>}
         */
    public async retrievePointsOfInterest(latitude: string, longitude: string, type: string) {
        const result = await axios.get(`${this.url}/v1/discover?at=${latitude},${longitude}&apiKey=${this.key}&q=${type}&limit=100`)
        result.data.items = result.data.items.filter((x: any) => x.distance < this.maxDistance)
        return result.data
    }

    /**
     * Converts the results from here api to values that smaller for mongo.
     * @param {HereApiResults} results results from one of the many api calls to here api. 
     * @returns {Object}
     */
    public convertPointOfInterestResultsForMongo(results: HereApiResults) {
        return results.items.map(x => (
            {
                name: x?.title,
                type: x?.categories?.some(x => x) ? x?.categories[0].name : 'Unknown',
                address: x?.address.label
            }
        ))
    }

}

export default new HereGeocodingService(config.get('hereGeocoding.hostname'), config.get('hereGeocoding.key'));