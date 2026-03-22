import { Router } from 'express';
import {
  assignEventSchema,
  createEventSchema,
  listEventsQuerySchema,
  updateEventStatusSchema,
} from '../validators/schemas';
import { asyncHandler } from '../utils/asyncHandler';
import { requireAdmin, type AdminRequest } from '../middleware/requireAdmin';
import {
  assignEventToVolunteer,
  createEvent,
  deleteEvent,
  getEventById,
  listEvents,
  updateEventStatus,
} from '../services/eventService';
import { routeParamId } from '../utils/routeParams';

export const eventsRouter = Router();

eventsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const query = listEventsQuerySchema.parse(req.query);
    const events = await listEvents({
      status: query.status,
      limit: query.limit,
    });
    res.json({ events });
  }),
);

eventsRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const event = await getEventById(routeParamId(req));
    res.json({ event });
  }),
);

eventsRouter.post(
  '/',
  requireAdmin,
  asyncHandler(async (req: AdminRequest, res) => {
    const body = createEventSchema.parse(req.body);
    const event = await createEvent(body);
    res.status(201).json({ event });
  }),
);

eventsRouter.patch(
  '/:id/status',
  requireAdmin,
  asyncHandler(async (req: AdminRequest, res) => {
    const body = updateEventStatusSchema.parse(req.body);
    const event = await updateEventStatus(routeParamId(req), body.status);
    res.json({ event });
  }),
);

eventsRouter.patch(
  '/:id/assign',
  requireAdmin,
  asyncHandler(async (req: AdminRequest, res) => {
    const body = assignEventSchema.parse(req.body);
    const event = await assignEventToVolunteer(routeParamId(req), body.volunteerName);
    res.json({ event });
  }),
);

eventsRouter.delete(
  '/:id',
  requireAdmin,
  asyncHandler(async (req: AdminRequest, res) => {
    await deleteEvent(routeParamId(req));
    res.status(204).end();
  }),
);
