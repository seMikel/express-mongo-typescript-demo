import { Response, Request } from 'express';
import { Controller } from './controller';
import { getAllProducts } from '../services/product.service';

export class ProductsController extends Controller {
    public path = '/products';

    public initializeRoutes() {
        this.get('', this.getProducts);
    }

    getProducts(req: Request, res: Response): Promise<any> {
        return getAllProducts().then(products => res.send(products));
    }
}
