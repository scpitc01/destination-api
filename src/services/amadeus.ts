import config from "config";
import axios from "axios";
var Amadeus = require('amadeus');

class AmadeusService {
    // Properties
    private amadeus
    // Constructor
    constructor(key: string, secret: string) {
        this.amadeus = new Amadeus({
            clientId: key,
            clientSecret: secret
        })
    }

    public async locationSafety(latitude: string, longitude: string) {
        const safteyResults = await this.amadeus.safety.safetyRatedLocations.get({
            latitude: latitude,
            longitude: longitude
        })
        return safteyResults
    }

    public async locationActivities(latitude: string, longitude: string) {
        const activityResults = await this.amadeus.shopping.activities.get({
            latitude: latitude,
            longitude: longitude,
            radius: 5
        })
        return activityResults
    }
}

export default new AmadeusService(config.get('amadeus.key'), config.get('amadeus.secret'));