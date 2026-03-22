import type { Event, EventStatus, Volunteer } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { AppError } from '../utils/AppError';
import { findVolunteerByName } from './volunteerService';

type EventRow = Event & { assignedVolunteer: Volunteer | null };

export function toApiEvent(row: EventRow) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    ...(row.assignedVolunteer && { assignedTo: row.assignedVolunteer.name }),
  };
}

const eventInclude = { assignedVolunteer: true } as const;

export async function listEvents(filters: { status?: EventStatus; limit?: number }) {
  const take = filters.limit ?? 50;
  const rows = await prisma.event.findMany({
    where: filters.status ? { status: filters.status } : undefined,
    orderBy: { createdAt: 'desc' },
    take,
    include: eventInclude,
  });
  return rows.map(toApiEvent);
}

export async function getEventById(id: string) {
  const row = await prisma.event.findUnique({
    where: { id },
    include: eventInclude,
  });
  if (!row) {
    throw new AppError(404, 'Event not found', 'NOT_FOUND');
  }
  return toApiEvent(row);
}

export async function createEvent(input: {
  title: string;
  description: string;
  status: EventStatus;
}) {
  const row = await prisma.event.create({
    data: {
      title: input.title,
      description: input.description,
      status: input.status,
    },
    include: eventInclude,
  });
  return toApiEvent(row);
}

export async function updateEventStatus(id: string, status: EventStatus) {
  try {
    const row = await prisma.event.update({
      where: { id },
      data: { status },
      include: eventInclude,
    });
    return toApiEvent(row);
  } catch {
    throw new AppError(404, 'Event not found', 'NOT_FOUND');
  }
}

export async function assignEventToVolunteer(id: string, volunteerName: string) {
  const volunteer = await findVolunteerByName(volunteerName);
  try {
    const row = await prisma.event.update({
      where: { id },
      data: { assignedVolunteerId: volunteer.id },
      include: eventInclude,
    });
    return toApiEvent(row);
  } catch {
    throw new AppError(404, 'Event not found', 'NOT_FOUND');
  }
}

export async function deleteEvent(id: string) {
  try {
    await prisma.event.delete({ where: { id } });
  } catch {
    throw new AppError(404, 'Event not found', 'NOT_FOUND');
  }
}
