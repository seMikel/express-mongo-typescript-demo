import {Response, Request, NextFunction} from 'express';

export function globalErrorHandler(err, req: Request, res: Response, next: NextFunction) {
    switch (err.name) {
        case 'ValidationError':
            // mongoose validation error
            res.status(400).json({ message: err.message });
            break;
        case 'UnauthorizedError':
            // jwt authentication error
            res.status(401).json({ message: 'Invalid Token' });
            break;
        default:
            console.log(err);
            res.status(err.status || 500).json({ message: err.message });
    }
}
