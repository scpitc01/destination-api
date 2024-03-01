import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import DestinationController from '../controllers/destination'
import { AddDestinationRequest } from '../types/requests/destination';
import { addDestinationObjectRequest } from '../swaggerSchemas/destination';

export default async function (app: FastifyInstance) {
    app.post('/', { schema: addDestinationObjectRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request as AddDestinationRequest
        return await DestinationController.insertLocation(body.body)
    })
}