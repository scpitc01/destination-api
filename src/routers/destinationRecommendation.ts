import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ListDestinationRecommendationRequest } from '../types/requests/destinationRecommendation'
import destinationRecommendation from '../controllers/destinationRecommendation'
import { listDestinationRecommendationObjectRequest } from '../swaggerSchemas/destinationRecommendation'

export default async function (app: FastifyInstance) {
    app.get('/:userId', { schema: listDestinationRecommendationObjectRequest }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request as ListDestinationRecommendationRequest
        return await destinationRecommendation.listRecommendationForUser(body.params.userId)
    })
}