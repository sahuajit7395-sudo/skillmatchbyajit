import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import { verifyAdminAccessToken } from '../lib/jwt';

export interface AdminRequest extends Request {
  adminUsername?: string;
}

export function requireAdmin(req: AdminRequest, _res: Response, next: NextFunction): void {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw new AppError(401, 'Missing or invalid Authorization header', 'UNAUTHORIZED');
    }
    const token = header.slice('Bearer '.length).trim();
    if (!token) {
      throw new AppError(401, 'Missing access token', 'UNAUTHORIZED');
    }
    const { sub } = verifyAdminAccessToken(token);
    req.adminUsername = sub;
    next();
  } catch {
    next(new AppError(401, 'Invalid or expired admin session', 'UNAUTHORIZED'));
  }
}
