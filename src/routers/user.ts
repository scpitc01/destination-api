import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import UserController from '../controllers/user'
import { User } from '../models/user'


export default async function (app: FastifyInstance) {
    app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    })
}