import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import { AppConfig } from './config';
import { connect, Mongoose } from 'mongoose';
import { Controller } from './controllers/controller';

export class App {
    private app: Application;
    private readonly port: number;
    private mongoose: Mongoose;

    constructor(config: AppConfig, controllers: Controller[]) {
        this.app = express();
        this.port = config.port;

        this.connectToDatabase(config.connectionString);
        this.initializeMiddlewares(config);
        this.initializeControllers(controllers);
    }

    private connectToDatabase(connectionString: string) {
        connect(connectionString, { useNewUrlParser: true }).then(mongoose => this.mongoose = mongoose);
    }

    private initializeMiddlewares(config: AppConfig) {
        this.app.use(bodyParser.json());
    }
    
    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.app.use(controller.path, controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
