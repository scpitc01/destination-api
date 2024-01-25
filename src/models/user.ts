import mongoose, { Schema, Document } from 'mongoose';


export interface User {
    username: string
    password: string
    email: string
    active: boolean
    salt: string
}

const userSchema = new Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    active: { type: Boolean, required: true },
    salt: { type: String, required: true }
});

const UserModel = mongoose.model<User>('user', userSchema);

export default UserModel;