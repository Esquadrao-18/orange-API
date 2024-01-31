import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined");
}

export function createToken(userId: string) {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

export function validateToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
