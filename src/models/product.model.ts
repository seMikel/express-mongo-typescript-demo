import { Document, Schema, model } from 'mongoose';
import { Product } from '../interfaces/product.interface';

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: {type: Number, required: true}
});

export const productRef = 'Product';
export const ProductModel = model<Product & Document>(productRef, ProductSchema);
