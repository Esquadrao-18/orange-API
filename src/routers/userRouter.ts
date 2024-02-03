import { Router } from 'express';
import validateSchema from '../middlewares/validateSchemaMiddleware';
import {
    googleSignInSchema,
    signInSchema,
    signUpSchema,
} from '../schemas/signSchemas';
import * as userController from '../controllers/userController';

const userRouter = Router();

userRouter.post('/signup', validateSchema(signUpSchema), userController.signUp);

userRouter.post('/signin', validateSchema(signInSchema), userController.signIn);

userRouter.post(
    '/signin/google',
    validateSchema(googleSignInSchema),
    userController.signInWithGoogle,
);

export default userRouter;
