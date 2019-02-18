import { ProductModel } from '../models/product.model';
import { Document } from 'mongoose';
import { Product } from '../interfaces/product.interface';

export async function getAllProducts(): Promise<(Product & Document)[]> {
    return ProductModel.find();
}