import { z } from 'zod';

export const eventStatusSchema = z.enum(['Upcoming', 'Ongoing', 'Completed']);

export const createEventSchema = z.object({
  title: z.string().trim().min(1, 'title required').max(200),
  description: z.string().trim().min(1, 'description required').max(5000),
  status: eventStatusSchema,
});

export const updateEventStatusSchema = z.object({
  status: eventStatusSchema,
});

export const assignEventSchema = z.object({
  volunteerName: z.string().trim().min(1, 'volunteerName required').max(120),
});

export const adminLoginSchema = z.object({
  username: z.string().trim().min(1, 'username required').max(120),
  password: z.string().min(1, 'password required').max(500),
});

export const listEventsQuerySchema = z.object({
  status: eventStatusSchema.optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

export const createVolunteerSchema = z.object({
  name: z.string().trim().min(1, 'name required').max(120),
});
