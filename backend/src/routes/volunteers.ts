import { Router } from 'express';
import { createVolunteerSchema } from '../validators/schemas';
import { asyncHandler } from '../utils/asyncHandler';
import { requireAdmin, type AdminRequest } from '../middleware/requireAdmin';
import { createVolunteer, listVolunteers } from '../services/volunteerService';

export const volunteersRouter = Router();

volunteersRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const volunteers = await listVolunteers();
    res.json({ volunteers });
  }),
);

volunteersRouter.post(
  '/',
  requireAdmin,
  asyncHandler(async (req: AdminRequest, res) => {
    const body = createVolunteerSchema.parse(req.body);
    const volunteer = await createVolunteer(body.name);
    res.status(201).json({ volunteer });
  }),
);
