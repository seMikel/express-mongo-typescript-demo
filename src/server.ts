import { App } from './app';
import { config } from './config'
import { UsersController } from './controllers/users.controller';

const app = new App(
    config,
    [
        new UsersController(),
    ]
);

app.listen();
