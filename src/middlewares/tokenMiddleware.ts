import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/tokenUtils';

const jwtMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const bearerToken = req.header('Authorization');

    // Ensure Authorization header is in correct format (Bearer <token>)
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        res.status(401).json({ error: 'No token, authorization denied' });
        return;
    }

    const token = bearerToken.split(' ')[1];

    const isValid = await validateToken(token);

    if (!isValid) {
        res.status(401).json({ error: 'Token is not valid' });
    } else {
        next();
    }
};

export default jwtMiddleware;
