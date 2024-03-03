import mongoose, { Schema, Document } from 'mongoose';


export interface Destination {
    city: string
    state: string
    hasZoo: boolean,
    hasSkiing: boolean,
    hasCasino: boolean,
    hasSportsStadium: boolean
}

const destinationSchema = new Schema<Destination>({
    city: { type: String, required: true },
    state: { type: String, required: true }

});

const DestinationModel = mongoose.model<Destination>('destination', destinationSchema);

export default DestinationModel;