import { UserDestinationRating } from "../../models/userDestinationRating";
import { FindDestinationRating } from "../objects/destinationRating";

export interface AddDestinationRatingRequest {
    body: UserDestinationRating
}

export interface FindDestinationRatingRequest {
    params: FindDestinationRating
}

export interface ListDestinationRatingRequest {
    params: {
        userId: string
    }
}