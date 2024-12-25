import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { UserOut } from '../dtos/users';

export const authenticate = (req: Request<{}, {}, UserOut>, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        req.user = verifyToken(token);
        next();
    } catch (err) {
        res.status(401).send('Invalid token');
    }
};
