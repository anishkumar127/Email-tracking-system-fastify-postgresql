export const readEmailSchema = {
    // querystring: {
    //     type: 'object',
    //     properties: {
    //         emailId: { type: 'string' },
    //         userId: { type: 'string' },
    //     },
    //     required: ['emailId', 'userId'],
    // },
    body: {
        type: 'object',
        properties: {
            emailId: { type: 'string' },
            userId: { type: 'string' },
        },
        required: ['emailId', 'userId'],
    },
    response: {
        200: {
            type: 'string',
            content: {
                'image/gif': { schema: { type: 'string' } },
            },
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' },
            },
        },
        500: {
            type: 'object',
            properties: {
                error: { type: 'string' },
            },
        },
    },
};

export const pingSchema = {
    body: {
        type: 'object',
        properties: {
            emailId: { type: 'string' },
            userId: { type: 'string' },
        },
        required: ['emailId', 'userId'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string' },
            },
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' },
            },
        },
        404: {
            type: 'object',
            properties: {
                error: { type: 'string' },
            },
        },
        500: {
            type: 'object',
            properties: {
                error: { type: 'string' },
            },
        },
    },
};
