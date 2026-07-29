import { generateMissionPool } from '../services/missionGenerator';
import prisma from '../services/db';

const spawn = async () => {
  const count = parseInt(process.argv[2]) || 10;
  const missions = generateMissionPool(count);

  console.log(`Clearing existing contracts and spawning ${count} new ones...`);

  await prisma.mission.deleteMany();

  for (const m of missions) {
    await prisma.mission.create({
      data: m
    });
  }

  console.log("Mission board updated.");
  process.exit(0);
};

spawn().catch(err => {
  console.error(err);
  process.exit(1);
});
