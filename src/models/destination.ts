import mongoose, { Schema, Document } from 'mongoose';

export interface DestinationResult {
    name: string,
    type: string,
    address: string
}

export interface Destination {
    city: string
    state: string
    hasZoo: boolean,
    hasSkiing: boolean,
    hasCasino: boolean,
    hasSportStadium: boolean
    hasMuseum: boolean,
    hasNightLife: boolean,
    hasAquarium: boolean,
    hasBeach: boolean
    hasMountains: boolean,
    hasOutdoorActivities: boolean,
    hasArtisticsPlays: boolean,
    hasAmusementPark: boolean,
    restaurantResults: DestinationResult[]
    museumResults: DestinationResult[],
    skiingResults: DestinationResult[],
    nightLifeResults: DestinationResult[],
    theaterResults: DestinationResult[],
    gamblingResults: DestinationResult[],
    landMarkResults: DestinationResult[],
    zooResults: DestinationResult[],
    aquariumResults: DestinationResult[],
    stadiumResults: DestinationResult[],
    hotelResults: DestinationResult[],
    outDoorResults: DestinationResult[]
}

const destinationSchema = new Schema<Destination>({
    city: { type: String, required: true },
    state: { type: String, required: true },
    hasZoo: { type: Boolean, required: true, default: false },
    hasSkiing: { type: Boolean, required: true, default: false },
    hasCasino: { type: Boolean, required: true, default: false },
    hasSportStadium: { type: Boolean, required: true, default: false },
    hasMuseum: { type: Boolean, required: true, default: false },
    hasNightLife: { type: Boolean, required: true, default: false },
    hasAquarium: { type: Boolean, required: true, default: false },
    hasBeach: { type: Boolean, required: true, default: false },
    hasMountains: { type: Boolean, required: true, default: false },
    hasOutdoorActivities: { type: Boolean, required: true, default: false },
    hasArtisticsPlays: { type: Boolean, required: true, default: false },
    hasAmusementPark: { type: Boolean, required: true, default: false },
    restaurantResults: {
        type: [], required: false
    },
    museumResults: {
        type: [], required: false
    },
    skiingResults: {
        type: [], required: false
    },
    nightLifeResults: {
        type: [], required: false
    },
    theaterResults: {
        type: [], required: false
    },
    gamblingResults: {
        type: [], required: false
    },
    landMarkResults: {
        type: [], required: false
    },
    zooResults: {
        type: [], required: false
    },
    aquariumResults: {
        type: [], required: false
    },
    stadiumResults: {
        type: [], required: false
    },
    hotelResults: {
        type: [], required: false
    },
    outDoorResults: {
        type: [], required: false
    }

});

const DestinationModel = mongoose.model<Destination>('destination', destinationSchema);

export default DestinationModel;