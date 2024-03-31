import mongoose, { Schema, Document } from 'mongoose';


export interface UserDestinationRecommendation {
    userId: string,
    destinationId: string,
    estimatedRating: Number
}

const userDestinationRecommendationSchema = new Schema<UserDestinationRecommendation>({
    userId: { type: String, ref: 'user', required: true },
    destinationId: { type: String, ref: 'destination', required: true },
    estimatedRating: { type: Number, reuqired: true }
});

const UserDestinationRecommendation = mongoose.model<UserDestinationRecommendation>('userDestinationRecommendation', userDestinationRecommendationSchema);

export default UserDestinationRecommendation;