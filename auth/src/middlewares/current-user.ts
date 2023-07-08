import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface UserPayload  {
    id: string,
    email: string
}

declare global {
    namespace Express {
        interface Request { // Add this property to the request that is already defined
            currentUser?: UserPayload; // Optional has been added as for not loggedin user this wont be there
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
)   => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, 'somesupersecret') as UserPayload;
        req.currentUser = payload;
    }
    catch (err) {

    }

    next();
}