import { Product } from './product.interface';

export interface User {
    name: string;
    hashedPass: string;
    email: string;
    purchases: {product: Product, amount: number}[]
}
