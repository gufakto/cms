import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sgufaktosiagian';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export const generateToken = (payload: object, expiresIn: string = JWT_EXPIRES_IN): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, JWT_SECRET);
};
