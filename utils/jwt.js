import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES || '1h';

export function generateToken(payload) {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
    return `Bearer ${token}`;
}
