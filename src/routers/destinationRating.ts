import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import DestinationRatingController from '../controllers/destinationRating'
import { AddDestinationRatingRequest, FindDestinationRatingRequest, ListDestinationRatingRequest } from '../types/requests/destinationRating'
import { addDestinationRatingObjectRequest, findDestinationRatingObjectRequest, listDestinationRatingObjectRequest } from '../swaggerSchemas/destinationRating'

export default async function (app: FastifyInstance) {
    app.post('/', { schema: addDestinationRatingObjectRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request as AddDestinationRatingRequest
        return await DestinationRatingController.insertDestinationRating(body.body)
    })
    app.patch('/', { schema: addDestinationRatingObjectRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request as AddDestinationRatingRequest
        return await DestinationRatingController.updateDestinationRating(body.body)
    })
    app.get('/:userId/:destinationId', { schema: findDestinationRatingObjectRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request as FindDestinationRatingRequest
        return await DestinationRatingController.findDestinationRating(body.params)
    })
    app.get('/:userId', { schema: listDestinationRatingObjectRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request as ListDestinationRatingRequest
        return await DestinationRatingController.listCombinedDestinationRating(body.params.userId)
    })
}