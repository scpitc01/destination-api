import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import UserController from '../controllers/authentication'
import { User } from '../models/user'
import { UserLoginObject } from '../types/objects/user'
import { loginPostRequest, registerationPostRequest, tokenValidationGetRequest } from '../swaggerSchemas/authentication';

export default async function (app: FastifyInstance) {

    app.post('/register', { schema: registerationPostRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as User
        return UserController.createUser(body)
    })

    app.post('/login', { schema: loginPostRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as UserLoginObject
        const jwt = await UserController.loginUser(body)

        return jwt ? reply.send(jwt) : reply.status(401).send({ message: 'Wrong username and password combination.' });
    })

    app.get('/token/valid', { schema: tokenValidationGetRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const token = request?.headers?.authorization
        if (!token) {
            return reply.status(401).send({ message: 'No token was sent in.' })
        }
        try {
            return await UserController.validateToken(token ?? "")
        }
        catch (err) {
            return reply.status(401).send({ message: 'There was an issue with verifying the token.' })
        }
    })
}