import mongoose, { Schema, Document } from 'mongoose';


export interface UserDestinationRating {
    userId: Schema.Types.ObjectId
    destinationId: Schema.Types.ObjectId
    rating: number
}

const userDestinationRatingSchema = new Schema<UserDestinationRating>({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    destinationId: { type: Schema.Types.ObjectId, ref: 'destination', required: true },
    rating: { type: Number, required: true }
});

const UserDestinationRating = mongoose.model<UserDestinationRating>('userDestinationRating', userDestinationRatingSchema);

export default UserDestinationRating;