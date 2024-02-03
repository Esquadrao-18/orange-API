import * as userRepository from '../repositories/userRepository';
import {
    SignInData,
    SignUpData,
    SignInWithGoogleData,
} from '../repositories/userRepository';
import * as errorUtils from '../utils/errorUtils';
import { comparePassword, hashPassword } from '../utils/passwordUtils';
import { createToken } from '../utils/tokenUtils';

export async function signUp(newUser: SignUpData) {
    const { email, password } = newUser;

    const isEmailTaken = await userRepository.findUserByEmail(email);
    if (isEmailTaken) {
        throw errorUtils.conflictError('Invalid user information');
    }

    const hashedPassword = hashPassword(String(password));

    newUser = { ...newUser, password: hashedPassword };

    return await userRepository.createUser(newUser);
}

export async function signIn(userCredentials: SignInData) {
    const { email, password } = userCredentials;

    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw errorUtils.unauthorizedError('Invalid user information');
    }

    const isPasswordValid = comparePassword(
        String(password),
        String(user.password),
    );
    if (!isPasswordValid) {
        throw errorUtils.unauthorizedError('Invalid user information');
    }

    const userId = user.id;

    return createToken(userId);
}

export async function signInWithGoogle(googleUser: SignInWithGoogleData) {
    const { email } = googleUser;

    const user = await userRepository.findUserByEmail(email);
    if (!user) return await userRepository.createUser(googleUser);

    const userId = user.id;

    return createToken(userId);
}
