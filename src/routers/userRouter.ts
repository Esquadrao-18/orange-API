import {Router} from "express";
import validateSchema from "../middlewares/validateSchemaMiddleware";
import {signInSchema, signUpSchema} from "../schemas/signSchemas";
import * as userController from "../controllers/userController";

const userRouter = Router();

userRouter.post(
    '/signup',
    validateSchema(signUpSchema),
    userController.signUp
);

userRouter.post(
    '/signin',
    validateSchema(signInSchema),
    userController.signIn
);

export default userRouter;