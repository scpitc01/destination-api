import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import DestinationRatingController from '../controllers/destinationRating'
import { AddDestinationRatingRequest, FindDestinationRatingRequest, ListDestinationRatingRequest, DeleteDestinationRatingRequest } from '../types/requests/destinationRating'
import { addDestinationRatingObjectRequest, deleteDestinationRatingObjectRequest, findDestinationRatingObjectRequest, listDestinationRatingObjectRequest } from '../swaggerSchemas/destinationRating'
import authenticationService from '../services/authentication'


export default async function (app: FastifyInstance) {
    app.post('/', { schema: addDestinationRatingObjectRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request as AddDestinationRatingRequest
        authenticationService.verifyUser(body.body.userId, request.headers.authorization?.replace('Bearer ', '') ?? "")
        return await DestinationRatingController.insertDestinationRating(body.body)
    })
    app.patch('/', { schema: addDestinationRatingObjectRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request as AddDestinationRatingRequest
        authenticationService.verifyUser(body.body.userId, request.headers.authorization?.replace('Bearer ', '') ?? "")
        return await DestinationRatingController.updateDestinationRating(body.body)
    })
    app.delete('/:userId/:destinationId', { schema: deleteDestinationRatingObjectRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request as DeleteDestinationRatingRequest
        authenticationService.verifyUser(body.params.userId, request.headers.authorization?.replace('Bearer ', '') ?? "")
        return await DestinationRatingController.deleteDestinationRating(body.params)
    })
    app.get('/:userId/:destinationId', { schema: findDestinationRatingObjectRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request as FindDestinationRatingRequest
        authenticationService.verifyUser(body.params.userId, request.headers.authorization?.replace('Bearer ', '') ?? "")
        return await DestinationRatingController.findDestinationRating(body.params)
    })
    app.get('/:userId', { schema: listDestinationRatingObjectRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request as ListDestinationRatingRequest
        authenticationService.verifyUser(body.params.userId, request.headers.authorization?.replace('Bearer ', '') ?? "")
        return await DestinationRatingController.listCombinedDestinationRating(body.params.userId)
    })
}