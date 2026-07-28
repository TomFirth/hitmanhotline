import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';
import "dotenv/config";

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: process.env.DATABASE_URL || 'file:./dev.db',
  })
});

async function main() {
  // Clear existing data
  await prisma.activeMission.deleteMany();
  await prisma.mission.deleteMany();

  const missions = [
    {
      name: 'First Blood',
      type: 'WETWORK',
      description: 'A simple elimination to get started.',
      difficulty: 1,
      durationSeconds: 60, // 1 minute for testing
      cashReward: 1000,
      intelReward: 0,
      riskLevel: 1,
    },
    {
      name: 'Data Heist',
      type: 'CYBER',
      description: 'Hack into a local server and steal some data.',
      difficulty: 2,
      durationSeconds: 300,
      cashReward: 2500,
      intelReward: 50,
      riskLevel: 2,
    },
    {
      name: 'Social Infiltration',
      type: 'SOCIAL',
      description: 'Attend a high-profile gala and gather intel.',
      difficulty: 3,
      durationSeconds: 600,
      cashReward: 5000,
      intelReward: 150,
      riskLevel: 2,
    }
  ];

  for (const m of missions) {
    await prisma.mission.create({ data: m });
  }

  console.log('Seed completed: Initial missions created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
