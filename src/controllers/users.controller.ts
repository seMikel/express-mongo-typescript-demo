import { Response, Request } from 'express';
import { Controller } from './controller';
import { UserParams } from '../interfaces/user-params.interface';
import { authenticateUser, createNewUser, getUserData, setUserPurchases } from '../services/user.service';

export class UsersController extends Controller {
    public path = '/users';

    public initializeRoutes() {
        this.post('/login', this.getUserToken);
        this.post('/register', this.createUser);
        this.get('/user', this.getUser);
        this.put('/purchases', this.updateUserPurchases);
    }

    getUserToken(req: Request, res: Response): Promise<any> {
        const user: UserParams = req.body;
        return authenticateUser(user).then(data => res.send(data))
    }

    createUser(req: Request, res: Response): Promise<any> {
        const user: UserParams = req.body;
        return createNewUser(user).then(data => res.send(data));
    }

    getUser(req: Request, res: Response): Promise<any> {
        return getUserData(req['auth'].uid).then(user => res.send(user));
    }

    updateUserPurchases(req: Request, res: Response): Promise<any> {
        return setUserPurchases(req['auth'].uid, req.body).then(user => res.send(user));
    }
}
