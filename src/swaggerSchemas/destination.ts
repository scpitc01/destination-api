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
            type: 'object'
        },
    },
};