export const addDestinationObjectRequest = {
    description: 'Add destination object to the mongo cache to be used for later.',
    tags: ['Destination'],
    body: {
        type: 'object',
        properties: {
            city: {
                type: 'string',
                description: 'The city for the destination you are requesting information about.'
            },
            stateAbbreviation: {
                type: 'string',
                description: 'The state abbreviation for the destination you are requesting information about.'
            }
        },
        required: [
            "city",
            "stateAbbreviation"
        ]
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                _id: { type: 'string' },
                city: { type: 'string' },
                hasZoo: { type: 'boolean' },
                hasSkiing: { type: 'boolean' },
                hasCasino: { type: 'boolean' },
                hasSportStadium: { type: 'boolean' },
                hasMuseum: { type: 'boolean' },
                hasNightLife: { type: 'boolean' },
                hasAquarium: { type: 'boolean' },
                hasBeach: { type: 'boolean' },
                hasMountains: { type: 'boolean' },
                hasOutdoorActivities: { type: 'boolean' },
                hasArtisticsPlays: { type: 'boolean' },
                hasAmusementPark: { type: 'boolean' },
                restaurantResults: { type: 'array' },
                museumResults: { type: 'array' },
                skiingResults: { type: 'array' },
                nightLifeResults: { type: 'array' },
                theaterResults: { type: 'array' },
                gamblingResults: { type: 'array' },
                landMarkResults: { type: 'array' },
                zooResults: { type: 'array' },
                aquariumResults: { type: 'array' },
                stadiumResults: { type: 'array' },
                hotelResults: { type: 'array' },
                outDoorResults: { type: 'array' }
            }
        },
    },
};