import mongoose, { Schema, Document } from 'mongoose';


export interface UserDestinationRecommendation {
    userId: Schema.Types.ObjectId
    destinationId: Schema.Types.ObjectId
}

const userDestinationRecommendationSchema = new Schema<UserDestinationRecommendation>({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    destinationId: { type: Schema.Types.ObjectId, ref: 'destination', required: true }
});

const UserDestinationRecommendation = mongoose.model<UserDestinationRecommendation>('userDestinationRecommendation', userDestinationRecommendationSchema);

export default UserDestinationRecommendation;