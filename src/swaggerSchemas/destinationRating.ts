export const addDestinationRatingObjectRequest = {
    description: 'Add destination rating object to the mongo cache to be used for later.',
    tags: ['Destination Rating'],
    security: [{ bearerAuth: [] }],
    body: {
        type: 'object',
        properties: {
            userId: {
                type: 'string',
                description: 'The mongo id for the user.'
            },
            destinationId: {
                type: 'string',
                description: 'The mongo id for the destination'
            },
            rating: {
                type: 'number',
                description: 'The rating for the destination given by the user.'
            }
        },
        required: [
            "userId",
            "destinationId",
            "rating"
        ]
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                _id: { type: 'string' },
                userId: { type: 'string' },
                destinationId: { type: 'string' },
                rating: { type: 'number' },
            }
        },
    },
};

export const updateDestinationRatingObjectRequest = {
    description: 'Update destination rating object to the mongo cache to be used for later.',
    tags: ['Destination Rating'],
    security: [{ bearerAuth: [] }],
    body: {
        type: 'object',
        properties: {
            userId: {
                type: 'string',
                description: 'The mongo id for the user.'
            },
            destinationId: {
                type: 'string',
                description: 'The mongo id for the destination'
            },
            rating: {
                type: 'number',
                description: 'The rating for the destination given by the user.'
            }
        },
        required: [
            "userId",
            "destinationId",
            "rating"
        ]
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                _id: { type: 'string' },
                userId: { type: 'string' },
                destinationId: { type: 'string' },
                rating: { type: 'number' }
            }
        },
    },
};

export const findDestinationRatingObjectRequest = {
    description: 'Find destination rating object.',
    tags: ['Destination Rating'],
    security: [{ bearerAuth: [] }],
    params: {
        type: 'object',
        properties: {
            userId: {
                type: 'string',
                description: 'The mongo id for the user.'
            },
            destinationId: {
                type: 'string',
                description: 'The mongo id for the destination'
            }
        },
        required: [
            "userId",
            "destinationId"
        ]
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                _id: { type: 'string' },
                userId: { type: 'string' },
                destinationId: { type: 'string' },
                rating: { type: 'number' }
            }
        },
    },
};