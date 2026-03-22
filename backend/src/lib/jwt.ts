import jwt from 'jsonwebtoken';
import { env } from '../env';

const ADMIN_ISSUER = 'skillmatch-api';
const ADMIN_AUDIENCE = 'skillmatch-admin';

export function signAdminAccessToken(username: string): string {
  return jwt.sign(
    { role: 'admin', sub: username },
    env.JWT_SECRET,
    {
      expiresIn: '7d',
      issuer: ADMIN_ISSUER,
      audience: ADMIN_AUDIENCE,
    },
  );
}

export function verifyAdminAccessToken(token: string): { sub: string } {
  const payload = jwt.verify(token, env.JWT_SECRET, {
    issuer: ADMIN_ISSUER,
    audience: ADMIN_AUDIENCE,
  }) as jwt.JwtPayload;

  if (payload.role !== 'admin' || typeof payload.sub !== 'string') {
    throw new Error('Invalid token payload');
  }

  return { sub: payload.sub };
}
