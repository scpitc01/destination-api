export const listDestinationRecommendationObjectRequest = {
    description: 'Lists destination recommendations for user.',
    tags: ['Destination Recommendation'],
    security: [{ bearerAuth: [] }],
    params: {
        type: 'object',
        properties: {
            userId: {
                type: 'string',
                description: 'The mongo id for the user.'
            }
        },
        required: [
            "userId"
        ]
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object'
        },
    },
}