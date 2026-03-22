import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message, code: err.code });
    return;
  }

  if (err instanceof ZodError) {
    const first = err.issues[0];
    const message = first ? `${first.path.join('.')}: ${first.message}` : 'Validation failed';
    res.status(400).json({ error: message, code: 'VALIDATION_ERROR' });
    return;
  }

  console.error('[SkillMatch API]', err);
  res.status(500).json({
    error: 'Internal server error',
    code: 'INTERNAL',
  });
}
