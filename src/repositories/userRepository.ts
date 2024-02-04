import prisma from '../config/database';
import { User } from '@prisma/client';

export async function createUser(newUser: SignUpData | SignInWithGoogleData) {
    return prisma.user.create({
        data: newUser,
    });
}

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email },
    });
}

export interface SignUpData extends Omit<User, 'id' | 'googleId'> {}

export interface SignInData extends Pick<User, 'email' | 'password'> {}

export interface SignInWithGoogleData extends Omit<User, 'id' | 'password'> {}

export interface TokenUserInfo
    extends Pick<User, 'id' | 'email' | 'name' | 'lastName'> {}
