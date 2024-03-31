const cityStateCombination = require('./seedCities.json')
const axios = require('axios')
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF2YW4iLCJ1c2VySWQiOiI2NWIxYjBlYmUyNzE2OTNiYjAxMDhiZDAiLCJpYXQiOjE3MTE5MTgyMjMsImV4cCI6MTcxMTkyMDAyM30.cIMDOQMhJ2MFrW4e8rQt5qzKCanWs3FrR8a4k-qEXUw"


async function runScript() {
    console.log("Started")
    let config = {
        headers: {
            'Authorization': token
        }
    }
    for (let combination of cityStateCombination) {
        await axios.post('http://localhost:3000/destination/', { city: combination.city, stateAbbreviation: combination.state }, config)
    }
    console.log("Ended")
}

runScript()