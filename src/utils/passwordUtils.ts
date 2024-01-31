import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const saltRounds = Number(+process.env.SALT_ROUNDS) || 10;

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, saltRounds);
}

export function comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
}
