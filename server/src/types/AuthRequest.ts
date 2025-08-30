// src/types/AuthRequest.ts
import { Request } from 'express';

export interface AuthUser {
  userId?: string;
  email?: string;
  [key: string]: any; // Allows extra fields (e.g., from Google profile)
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}
