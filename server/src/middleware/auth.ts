// src/middleware/auth.ts
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/AuthRequest';

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      email: string;
    };

    req.user = decoded; // Now matches the flexible AuthUser interface
    next();
  } catch (err) {
    console.error('❌ JWT Error:', err);
    res.status(403).json({ message: 'Invalid token' });
  }
};
