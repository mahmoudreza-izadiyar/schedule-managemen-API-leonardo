// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  try {
    // create two dummy schedules
    const schedule1 = await prisma.schedule.upsert({
      where: { id: '1' },
      update: {},
      create: {
        id: '1',
        account_id: 1,
        agent_id: 1,
        start_time: new Date('2023-10-01T09:00:00Z'),
        end_time: new Date('2023-10-01T17:00:00Z'),
        tasks: {
          create: [
            {
              id: '1',
              account_id: 1,
              start_time: new Date('2023-10-01T09:00:00Z'),
              duration: 60,
              type: 'Meeting',
            },
            {
              id: '2',
              account_id: 1,
              start_time: new Date('2023-10-01T10:00:00Z'),
              duration: 30,
              type: 'Call',
            },
          ],
        },
      },
    });

    const schedule2 = await prisma.schedule.upsert({
      where: { id: '2' },
      update: {},
      create: {
        id: '2',
        account_id: 2,
        agent_id: 2,
        start_time: new Date('2023-10-02T09:00:00Z'),
        end_time: new Date('2023-10-02T17:00:00Z'),
        tasks: {
          create: [
            {
              id: '3',
              account_id: 2,
              start_time: new Date('2023-10-02T09:00:00Z'),
              duration: 45,
              type: 'Review',
            },
            {
              id: '4',
              account_id: 2,
              start_time: new Date('2023-10-02T11:00:00Z'),
              duration: 90,
              type: 'Development',
            },
          ],
        },
      },
    });

    console.log({ schedule1, schedule2 });
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
