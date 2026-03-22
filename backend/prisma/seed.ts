import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.event.deleteMany();
  await prisma.volunteer.deleteMany();

  const rahul = await prisma.volunteer.create({
    data: { id: 'v_rahul', name: 'Rahul' },
  });
  await prisma.volunteer.create({
    data: { id: 'v_priya', name: 'Priya' },
  });

  await prisma.event.create({
    data: {
      id: 'e1',
      title: 'Flood Relief Coordination',
      description: 'Coordinate relief material distribution across key zones.',
      status: 'Upcoming',
    },
  });

  await prisma.event.create({
    data: {
      id: 'e2',
      title: 'Medical Camp Setup',
      description: 'Assist in setting up first-aid and triage tents.',
      status: 'Ongoing',
      assignedVolunteerId: rahul.id,
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
