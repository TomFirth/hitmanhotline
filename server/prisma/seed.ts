import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import "dotenv/config";

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: process.env.DATABASE_URL || 'file:./dev.db',
  })
});

async function main() {
  await prisma.activeMission.deleteMany();
  await prisma.mission.deleteMany();

  const missions = [
    {
      name: 'First Blood',
      type: 'WETWORK',
      description: 'A simple elimination to get started. Guaranteed success.',
      difficulty: 0,
      durationSeconds: 60,
      cashReward: 500,
      intelReward: 0,
      riskLevel: 0,
    },
    {
      name: 'Safe Cracker',
      type: 'CYBER',
      description: 'Infiltrate a local small business and crack a simple safe.',
      difficulty: 0,
      durationSeconds: 120,
      cashReward: 600,
      intelReward: 5,
      riskLevel: 0,
    },
    {
      name: 'The Courier',
      type: 'SOCIAL',
      description: 'Intercept a package without being noticed.',
      difficulty: 0,
      durationSeconds: 180,
      cashReward: 700,
      intelReward: 10,
      riskLevel: 0,
    }
  ];

  for (const m of missions) {
    await prisma.mission.create({ data: m });
  }

  console.log('Seed completed: Beginner missions created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
