import joi from 'joi';
import {
    SignUpData,
    SignInData,
    SignInWithGoogleData,
} from '../repositories/userRepository';

export const signUpSchema = joi.object<SignUpData>({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    name: joi.string().required(),
    lastName: joi.string().required(),
});

export const signInSchema = joi.object<SignInData>({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

export const googleSignInSchema = joi.object<SignInWithGoogleData>({
    email: joi.string().email().required(),
    googleId: joi.string().required(),
    name: joi.string().required(),
    lastName: joi.string().required(),
});
