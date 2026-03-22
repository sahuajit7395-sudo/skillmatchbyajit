import bcrypt from 'bcryptjs';
import { env } from '../env';
import { AppError } from '../utils/AppError';

export async function verifyAdminCredentials(
  username: string,
  password: string,
): Promise<void> {
  if (username !== env.ADMIN_USERNAME) {
    throw new AppError(401, 'Invalid credentials', 'INVALID_CREDENTIALS');
  }

  if (env.ADMIN_PASSWORD_HASH) {
    const ok = await bcrypt.compare(password, env.ADMIN_PASSWORD_HASH);
    if (!ok) {
      throw new AppError(401, 'Invalid credentials', 'INVALID_CREDENTIALS');
    }
    return;
  }

  if (env.NODE_ENV === 'production' && env.ADMIN_PASSWORD) {
    console.warn(
      '[SkillMatch API] Plain ADMIN_PASSWORD in production is insecure; use ADMIN_PASSWORD_HASH.',
    );
  }

  if (password !== env.ADMIN_PASSWORD) {
    throw new AppError(401, 'Invalid credentials', 'INVALID_CREDENTIALS');
  }
}
