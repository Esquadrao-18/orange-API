import { Request, Response, NextFunction } from 'express';
import {
    AppError,
    errorTypeToStatusCode,
    isAppError,
} from '../utils/errorUtils.js';

export default function errorMiddleware(
    err: Error | AppError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
) {
    if (isAppError(err)) {
        console.error(err.message);
        return res.status(errorTypeToStatusCode(err.type)).send(err.message);
    }
    console.error(err);
    return res.sendStatus(500);
}
