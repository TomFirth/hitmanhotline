import { generateSponsorPool } from '../services/sponsorGenerator';
import prisma from '../services/db';

const spawn = async () => {
  const count = parseInt(process.argv[2]) || 10;
  const sponsors = generateSponsorPool(count);

  console.log(`Clearing existing sponsors and spawning ${count} new ones...`);

  await prisma.sponsor.deleteMany();

  for (const s of sponsors) {
    await prisma.sponsor.create({
      data: s
    });
  }

  console.log("Sponsor pool updated.");
  process.exit(0);
};

spawn().catch(err => {
  console.error(err);
  process.exit(1);
});
