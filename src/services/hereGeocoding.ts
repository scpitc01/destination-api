import config from "config";
import axios from "axios";

class HereGeocodingService {
    // Properties
    private url = ''
    private key = ''
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
        return result.data
    }


}

export default new HereGeocodingService(config.get('hereGeocoding.hostname'), config.get('hereGeocoding.key'));