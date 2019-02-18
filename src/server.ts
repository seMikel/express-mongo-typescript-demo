import { App } from './app';
import { config } from './config'
import { UsersController } from './controllers/users.controller';
import { ProductsController } from './controllers/products.controller';

const app = new App(
    config,
    [
        new UsersController(),
        new ProductsController()
    ]
);

app.listen();
