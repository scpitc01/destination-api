import { Destination } from "../../models/destination";

export interface FindDestinationRating {
    userId: string,
    destinationId: string
}

export interface DestinationRatingWithDestination extends Destination {
    rating: number
}