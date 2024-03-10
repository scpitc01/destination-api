import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import DestinationController from '../controllers/destination'
import { AddDestinationRequest, FindDestinationRequest } from '../types/requests/destination';
import { addDestinationObjectRequest, findDestinationObjectRequest } from '../swaggerSchemas/destination';

export default async function (app: FastifyInstance) {
    app.post('/', { schema: addDestinationObjectRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request as AddDestinationRequest
        return await DestinationController.insertLocation(body.body)
    })

    app.get('/:id', { schema: findDestinationObjectRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const req = request as FindDestinationRequest
        return await DestinationController.findLocation(req.params.id)
    })
}