import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import { AppConfig } from './config';
import { connect, Mongoose } from 'mongoose';
import { UserModel } from './models/user.model';

export class App {
    private app: Application;
    private readonly port: number;
    private mongoose: Mongoose;

    constructor(config: AppConfig) {
        this.app = express();
        this.port = config.port;

        this.connectToDatabase(config.connectionString);
        this.initializeMiddlewares(config);
    }

    private connectToDatabase(connectionString: string) {
        connect(connectionString, { useNewUrlParser: true }).then(mongoose => this.mongoose = mongoose);
        UserModel.findOne({ name: 'test' }).then(user => console.log({user: user.name, password: user.hashedPass}));
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
