import { Router } from 'express';
import { adminLoginSchema } from '../validators/schemas';
import { asyncHandler } from '../utils/asyncHandler';
import { verifyAdminCredentials } from '../services/authService';
import { signAdminAccessToken } from '../lib/jwt';
import { adminLoginLimiter } from '../middleware/rateLimiters';

export const authRouter = Router();

const WEEK_SECONDS = 60 * 60 * 24 * 7;

authRouter.post(
  '/admin/login',
  adminLoginLimiter,
  asyncHandler(async (req, res) => {
    const body = adminLoginSchema.parse(req.body);
    await verifyAdminCredentials(body.username, body.password);
    const accessToken = signAdminAccessToken(body.username);
    res.json({
      accessToken,
      tokenType: 'Bearer',
      expiresInSeconds: WEEK_SECONDS,
    });
  }),
);
