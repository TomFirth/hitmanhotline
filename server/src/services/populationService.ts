import prisma from './db';
import { generateMissionPool } from './missionGenerator';
import { generateMarketPool } from './staffGenerator';
import { calculateSalary } from '../models/Staff';
import { generateSponsorPool } from './sponsorGenerator';
import { generateNewsFeed } from './newsGenerator';

export const ensureMinimumContent = async () => {
  console.log('--- Initialising Content Audit ---');

  
  let marketUser = await prisma.user.findUnique({ where: { id: 'market-user-id' } });
  if (!marketUser) {
    console.log('Auditor: Creating market placeholder user...');
    await prisma.user.create({
      data: {
        id: 'market-user-id',
        email: 'market@agency.com',
        username: 'The Market',
        password: 'placeholder_password',
        agencyName: 'Shadow Market',
        entityType: 'Global Exchange',
        registrationNumber: 'MARKET-001',
        registeredAddress: 'Encrypted Proxy'
      }
    });
  }

  let defaultUser = await prisma.user.findUnique({ where: { id: 'mock-user-id' } });
  if (!defaultUser) {
    console.log('Auditor: Creating default CEO account...');
    await prisma.user.create({
      data: {
        id: 'mock-user-id',
        email: 'ceo@agency.com',
        username: 'Director Tom',
        password: 'hashed_password',
        agencyName: 'The Hotline',
        balance: 5000,
        reputation: 10,
        registrationNumber: `HH-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 90 + 10)}`,
        entityType: 'Sole Trader',
        incorporationDate: new Date(),
        registeredAddress: 'Sector 7G, Sub-Level 4, Agency HQ'
      }
    });
  }

  
  const missionCount = await prisma.mission.count();
  if (missionCount < 10) {
    console.log(`Auditor: ${missionCount} missions found. Restocking board...`);
    const newMissions = generateMissionPool(10);
    for (const m of newMissions) {
      await prisma.mission.create({ data: m });
    }
  }

  
  const marketStaffCount = await prisma.staff.count({ where: { userId: 'market-user-id' } });
  if (marketStaffCount < 10) {
    console.log(`Auditor: ${marketStaffCount} market assets found. Scouting new talent...`);
    const newRecruits = generateMarketPool(10);
    for (const r of newRecruits) {
      
      const { id, cost, ...data } = r;
      await prisma.staff.create({
        data: {
          ...data,
          salary: calculateSalary({
            combat: r.combat,
            subterfuge: r.subterfuge,
            technical: r.technical,
            logistics: r.logistics,
            diplomacy: r.diplomacy
          } as any, r.age, r.seniority as any),
          userId: 'market-user-id',
          awards: ''
        }
      });
    }
  }

  
  const sponsorCount = await prisma.sponsor.count();
  if (sponsorCount < 10) {
    console.log(`Auditor: ${sponsorCount} sponsors found. Generating deals...`);
    const newSponsors = generateSponsorPool(10);
    for (const s of newSponsors) {
      
      const { id, ...data } = s;
      await prisma.sponsor.create({ data });
    }
  }

  
  const newsCount = await prisma.newsHeadline.count();
  if (newsCount < 5) {
    console.log(`Auditor: ${newsCount} news items found. Updating wire...`);
    const newHeadlines = generateNewsFeed(5);
    for (const n of newHeadlines) {
      
      const { id, ...data } = n;
      await prisma.newsHeadline.create({ data });
    }
  }

  console.log('--- Content Audit Complete ---');
};
