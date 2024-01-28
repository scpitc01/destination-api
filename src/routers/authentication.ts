import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import UserController from '../controllers/user'
import { User } from '../models/user'
import { UserLoginObject } from '../types/objects/user'
import { loginPostRequest, registerationPostRequest } from '../swaggerSchemas/authentication';

export default async function (app: FastifyInstance) {

    app.post('/register', { schema: registerationPostRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as User
        return UserController.createUser(body)
    })

    app.post('/login', { schema: loginPostRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as UserLoginObject
        const jwt = await UserController.loginUser(body)

        return jwt ? reply.send({ token: jwt }) : reply.status(401).send({ message: 'Wrong username and password combination.' });
    })
}