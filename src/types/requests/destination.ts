import { AddDestinationObject } from "../objects/destination";

export interface AddDestinationRequest {
    body: AddDestinationObject
}

export interface FindDestinationRequest {
    params: {
        id: string
    }
}