import config from "config";
import axios from "axios";

class OpenCageService {
    // Properties
    private url = ''
    private key = ''
    // Constructor
    constructor(url: string, key: string) {
        this.url = url
        this.key = key
    }

    /**
     * Determines the longitude and latitude of a city inside the US and basic information about the location.
     * @param {string} city The city you are currently trying to look up. 
     * @param {string} stateAbbreviation The state abbreviation for the location you are trying to look up.
     * @returns {Promise<OpenCageResults>}
     */
    public async retrieveCoordinates(city: string, stateAbbreviation: string) {
        const result = await axios.get(`${this.url}/geocode/v1/json?q=${city},${stateAbbreviation}&key=${this.key}&language=en&pretty=1`)
        return result.data
    }
}

export default new OpenCageService(config.get('opencage.hostname'), process.env.OPENCAGE_KEY);