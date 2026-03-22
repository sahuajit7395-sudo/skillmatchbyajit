import type { Request } from 'express';
import { AppError } from './AppError';

export function routeParamId(req: Request, key = 'id'): string {
  const raw = req.params[key];
  const id = Array.isArray(raw) ? raw[0] : raw;
  if (typeof id !== 'string' || !id.trim()) {
    throw new AppError(400, 'Invalid route parameter', 'BAD_REQUEST');
  }
  return id.trim();
}
