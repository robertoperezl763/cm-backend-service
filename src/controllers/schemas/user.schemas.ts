import { FastifySchema } from 'fastify';

const userBaseProps = {
    id: {type: 'number'},
    email: { type: 'string'},
    firstName: { type: 'string'},
    lastName: { type: 'string'}
}


export const userResponseSchema: FastifySchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                user: {
                    type: 'object',
                    properties: {
                        ...userBaseProps
                    }


                }
            }
        }
    }
};



export const userBodySchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['user'],
        properties: {
            user: {
                type: 'object',
                properties: {
                    ...userBaseProps,
                    password: { type: 'string'}
                }
            },
        },
    }
};

export const loginResponseSchema: FastifySchema = {
    response: {
        200 : {
            type: 'object',
            required: ['token'],
            properties: {
                token: { type: 'string' },
                user: {
                    type: 'object',
                    properties: {
                        ...userBaseProps
                    }
                }
            },
    }
    },
};
export const tokenResponseSchema: FastifySchema = {
    response: {
        200 : {
            type: 'object',
            required: ['token'],
            properties: {
                token: { type: 'string' }
            },
    }
    },
};