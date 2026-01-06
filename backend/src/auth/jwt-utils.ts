import * as jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'secret';

export function generateVerificationToken(email: string) {
  return jwt.sign({ email }, SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
