import { Document, Schema, model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { productRef } from './product.model';

const PurchaseSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: productRef },
    amount: { type: Number, required: true }
})

const UserSchema = new Schema({
    name: { type: String, unique: true, required: true },
    hashedPass: { type: String, required: true },
    email: { type: String, required: true },
    purchases: [PurchaseSchema]
});

export const userRef = 'User';
export const UserModel = model<User & Document>(userRef, UserSchema);
