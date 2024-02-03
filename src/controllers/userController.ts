import { Request, Response } from 'express';
import * as userService from '../services/userService';

export async function signUp(req: Request, res: Response) {
    const newUser = await userService.signUp(res.locals.verified);

    if (!newUser) return res.sendStatus(500);

    return res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
    const token = await userService.signIn(res.locals.verified);

    return res.status(200).send({ token: token });
}

export async function signInWithGoogle(req: Request, res: Response) {
    const token = await userService.signInWithGoogle(res.locals.verified);

    return res.status(200).send({ token: token });
}
