import { Destination } from "../../models/destination";

export interface FindDestinationRating {
    userId: string,
    destinationId: string
}

export interface PointOfInterest {
    name: string,
    type: string,
    address: string
}

export interface DestinationForRating {
    _id: string,
    state: string,
    city: string,
    aquariumCount: number,
    landMarkCount: number,
    museumCount: number,
    skiingCount: number,
    theaterCount: number,
    nightLifeCount: number,
    gamblingCount: number,
    outDoorCount: number,
    zooCount: number,
    restaurantResults: PointOfInterest[],
    casualResturantCount: number,
    fineResturantCount: number,
    barResturantCount: number
}

export interface DestinationRatingWithDestination extends DestinationForRating {
    rating: number
}

export interface DestinationWithEstimatedRating extends DestinationForRating {
    estimatedRating: number
}