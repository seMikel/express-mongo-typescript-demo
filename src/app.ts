import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import { AppConfig } from './config';

export class App {
    private app: Application;
    private readonly port: number;

    constructor(config: AppConfig) {
        this.app = express();
        this.port = config.port;

        this.initializeMiddlewares(config);
    }

    private initializeMiddlewares(config: AppConfig) {
        this.app.use(bodyParser.json());
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
