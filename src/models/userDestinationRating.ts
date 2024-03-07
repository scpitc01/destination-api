import mongoose, { Schema, Document } from 'mongoose';


export interface UserDestinationRating {
    userId: string
    destinationId: string
    rating: number
}

const userDestinationRatingSchema = new Schema<UserDestinationRating>({
    userId: { type: String, ref: 'user', required: true },
    destinationId: { type: String, ref: 'destination', required: true },
    rating: { type: Number, required: true }
});

const UserDestinationRating = mongoose.model<UserDestinationRating>('userDestinationRating', userDestinationRatingSchema);

export default UserDestinationRating;