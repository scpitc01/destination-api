import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import UserController from '../controllers/user'
import { User } from '../models/user'


export default async function (app: FastifyInstance) {
    app.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as User
        console.log("Hey it worked")
        return UserController.createUser(body)
    })
}