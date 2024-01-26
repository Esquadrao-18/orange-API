import joi from 'joi';
import {SignUpData, SignInData} from "../repositories/userRepository";

export const signUpSchema = joi.object<SignUpData>({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    name: joi.string().required(),
    lastName: joi.string().required(),
    googleId: joi.string().allow(null),
    loggedWithGoogle: joi.boolean().required()
});

export const signInSchema = joi.object<SignInData>({
    email: joi.string().email().required(),
    password: joi.string().required()
});