
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(' Received Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token);

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(' Token Decoded:', decoded);

    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    console.error(' Auth error:', err);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
