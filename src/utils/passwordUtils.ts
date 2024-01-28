import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// @ts-ignore
const saltRounds = Number(+process.env.SALT_ROUNDS) || 10;

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, saltRounds);
}

export function comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
}