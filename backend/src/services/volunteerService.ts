import type { Volunteer } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { AppError } from '../utils/AppError';

export function toApiVolunteer(v: Volunteer) {
  return { id: v.id, name: v.name };
}

export async function listVolunteers() {
  const rows = await prisma.volunteer.findMany({
    orderBy: { name: 'asc' },
  });
  return rows.map(toApiVolunteer);
}

export async function createVolunteer(name: string) {
  const existing = await prisma.volunteer.findFirst({
    where: { name: { equals: name } },
  });
  if (existing) {
    throw new AppError(409, 'A volunteer with this name already exists', 'DUPLICATE');
  }
  const v = await prisma.volunteer.create({
    data: { name },
  });
  return toApiVolunteer(v);
}

export async function findVolunteerByName(volunteerName: string) {
  const trimmed = volunteerName.trim();
  let v = await prisma.volunteer.findFirst({
    where: { name: trimmed },
  });
  if (!v) {
    const all = await prisma.volunteer.findMany();
    v =
      all.find((row) => row.name.toLowerCase() === trimmed.toLowerCase()) ??
      null;
  }
  if (!v) {
    throw new AppError(404, `Volunteer "${trimmed}" not found`, 'NOT_FOUND');
  }
  return v;
}
