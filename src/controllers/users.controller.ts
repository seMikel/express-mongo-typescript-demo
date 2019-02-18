import {Response, Request} from 'express';
import {Controller} from './controller';
import { UserParams } from '../interfaces/user-params.interface';
import { authenticateUser, createNewUser } from '../services/user.service';
import { UserModel } from '../models/user.model';

export class UsersController extends Controller {
    public path = '/users';

    public initializeRoutes() {
        this.post('/login', this.getUserToken);
        this.post('/register', this.createUser);
        this.get('/:name', this.getUserData);
    }

    getUserToken(req: Request, res: Response): Promise<any> {
        const user: UserParams = req.body;
        return authenticateUser(user).then(data => res.send(data))
    }

    createUser(req: Request, res: Response): Promise<any> {
        const user: UserParams = req.body;
        return createNewUser(user).then(data => res.send(data));
    }

    getUserData(req: Request, res: Response): Promise<any> {
        const name = req.params.name;
        return UserModel.findOne({name}).then(user => res.send(user.id));
    }
}
