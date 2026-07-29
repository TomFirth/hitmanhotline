import { generateNewsFeed } from '../services/newsGenerator';
import prisma from '../services/db';

const spawn = async () => {
  const count = parseInt(process.argv[2]) || 5;
  const news = generateNewsFeed(count);

  console.log(`Clearing old news and spawning ${count} fresh headlines...`);

  await prisma.newsHeadline.deleteMany();

  for (const n of news) {
    await prisma.newsHeadline.create({
      data: n
    });
  }

  console.log("News feed updated.");
  process.exit(0);
};

spawn().catch(err => {
  console.error(err);
  process.exit(1);
});
