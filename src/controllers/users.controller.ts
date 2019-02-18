import {Response, Request} from 'express';
import {Controller} from './controller';

export class UsersController extends Controller {
    public path = '/users';

    public initializeRoutes() {
        this.get('/login', this.getUserToken);
        this.post('/register', this.createUser);
    }

    getUserToken(req: Request, res: Response): Promise<any> {
        return Promise.resolve(res.send('login'));
    }

    createUser(req: Request, res: Response): Promise<any> {
        return Promise.resolve(res.send('register'));
    }
}
