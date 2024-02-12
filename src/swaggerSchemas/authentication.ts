
export const registerationPostRequest = {
    description: 'Authentication Registration Request',
    tags: ['Authentication'],
    body: {
        type: 'object',
        properties: {
            username: {
                type: 'string',
                description: 'User name that is being requested for the users.'
            },
            password: {
                type: 'string',
                description: 'Password for the user.'
            },
            email: {
                type: 'string',
                description: 'Email for the user.'
            }
        },
        required: [
            "username",
            "password"
        ]
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                username: { type: 'string' }
            }
        },
    },
};


export const loginPostRequest = {
    description: 'Login Request',
    tags: ['Authentication'],
    body: {
        type: 'object',
        properties: {
            username: {
                type: 'string',
                description: 'User name that is being requested for the users.'
            },
            password: {
                type: 'string',
                description: 'Password for the user.'
            }
        },
        required: [
            "username",
            "password"
        ]
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                token: { type: 'string' }
            }
        },
    },
};

export const tokenValidationGetRequest = {
    description: 'Authentication Token Validation Request',
    tags: ['Authentication'],
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                username: { type: 'string' }
            }
        },
    },
};