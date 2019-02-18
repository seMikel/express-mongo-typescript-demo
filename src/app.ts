import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import { AppConfig } from './config';
import { connect, Mongoose } from 'mongoose';
import { Controller } from './controllers/controller';
import { jwt } from './helpers/jwt';
import { globalErrorHandler } from './helpers/globalErrorHandler';

export class App {
    private app: Application;
    private readonly port: number;
    private mongoose: Mongoose;

    constructor(config: AppConfig, controllers: Controller[]) {
        this.app = express();
        this.port = config.port;

        this.connectToDatabase(config.connectionString);
        this.initializeMiddlewares(config, this.initializeControllers(controllers));
        this.initializeControllers(controllers);
    }

    private connectToDatabase(connectionString: string) {
        connect(connectionString, { useNewUrlParser: true }).then(mongoose => this.mongoose = mongoose);
    }

    private initializeMiddlewares(config: AppConfig, controllerInitialization: () => void) {
        this.app.use(bodyParser.json());
        this.app.use(jwt(config.secret, config.safeRoutes));
        controllerInitialization();
        this.app.use(globalErrorHandler);
    }

    private initializeControllers(controllers: Controller[]): () => void {
        return () => {
            controllers.forEach((controller) => {
                this.app.use(controller.path, controller.router);
            });
        }
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
