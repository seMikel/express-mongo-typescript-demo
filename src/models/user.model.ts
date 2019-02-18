import { Document, Schema, model } from 'mongoose';
import { User } from '../interfaces/user.interface';

const UserSchema = new Schema({
    name: { type: String, unique: true, required: true },
    hashedPass: { type: String, required: true }
});

export const UserModel = model<User & Document>('User', UserSchema);
