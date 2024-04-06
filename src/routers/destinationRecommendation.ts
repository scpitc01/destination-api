import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ListDestinationRecommendationRequest } from '../types/requests/destinationRecommendation'
import destinationRecommendation from '../controllers/destinationRecommendation'
import authenticationService from '../services/authentication'
import { listDestinationRecommendationObjectRequest } from '../swaggerSchemas/destinationRecommendation'

export default async function (app: FastifyInstance) {
    app.get('/:userId', { schema: listDestinationRecommendationObjectRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request as ListDestinationRecommendationRequest
        authenticationService.verifyUser(body.params.userId, request.headers.authorization?.replace('Bearer ', '') ?? "")
        return await destinationRecommendation.listRecommendationForUser(body.params.userId)
    })
}