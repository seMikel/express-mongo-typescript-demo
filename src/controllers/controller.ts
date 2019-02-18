import {NextFunction, Request, Response, Router} from 'express';

export abstract class Controller {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    public get(path: string, handler: (request: Request, response: Response, next?:NextFunction) => Promise<any>) {
        this.router.get(path, this.useHandler(handler));
    }

    public post(path: string, handler: (request: Request, response: Response, next?:NextFunction) => Promise<any>) {
        this.router.post(path, this.useHandler(handler));
    }

    public put(path: string, handler: (request: Request, response: Response, next?:NextFunction) => Promise<any>) {
        this.router.put(path, this.useHandler(handler));
    }

    public delete(path: string, handler: (request: Request, response: Response, next?:NextFunction) => Promise<any>) {
        this.router.delete(path, this.useHandler(handler));
    }

    private useHandler(handler: (request: Request, response: Response, next?:NextFunction) => Promise<any>): (request: Request, response: Response, next:NextFunction) => void {
        return (req, res, next) => handler(req, res, next).catch(next);
    }

    public abstract path: string;
    public abstract initializeRoutes(): void;
}
