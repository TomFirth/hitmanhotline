import { Router, Request, Response } from 'express';
import { StaffType, calculateSalary, Seniority } from '../models/Staff';
import { generateFlavor } from '../services/flavorGenerator';
import prisma from '../services/db';

const router = Router();

let mockStaff = [
  {
    id: '1',
    userId: 'user123',
    name: 'Agent 47',
    type: StaffType.HITMAN,
    age: 35,
    seniority: Seniority.SENIOR,
    experience: 850,
    skills: {
      combat: 5,
      subterfuge: 4,
      technical: 2,
      logistics: 3,
      diplomacy: 1,
    },
    status: 'IDLE',
    salary: 500,
    hireDate: new Date(),
  }
];

router.get('/', async (req: Request, res: Response) => {
  const staff = await prisma.staff.findMany();
  const formattedStaff = staff.map(s => ({
    ...s,
    awards: s.awards ? s.awards.split(',') : []
  }));
  res.json(formattedStaff);
});

router.post('/init-agency', async (req: Request, res: Response) => {
  const userId = 'mock-user-id';

  const existingStaff = await prisma.staff.findMany({ where: { userId } });
  if (existingStaff.length > 0) {
    return res.status(200).json({ message: 'Agency already initialized' });
  }

  let user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
        email: 'ceo@agency.com',
        username: 'Director Tom',
        password: 'hashed_password',
        balance: 5000,
        reputation: 10,
        registrationNumber: `HH-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 90 + 10)}`,
        entityType: 'Sole Trader',
        incorporationDate: new Date(),
        registeredAddress: 'Sector 7G, Sub-Level 4, Agency HQ'
      }
    });
  }

  const agent47 = await prisma.staff.create({
    data: {
      userId,
      name: 'Agent 47',
      type: StaffType.HITMAN,
      age: 35,
      seniority: Seniority.SENIOR,
      experience: 850,
      combat: 5,
      subterfuge: 4,
      technical: 2,
      logistics: 3,
      diplomacy: 1,
      salary: 500,
      status: 'IDLE',
      previousJob: 'Unknown',
      quirk: 'Refuses to wear anything but a suit',
      backstory: 'The most efficient asset in the history of the industry.',
      flavorText: 'A legend among shadows.',
      awards: ''
    }
  });

  res.status(201).json({
    user,
    staff: [{ ...agent47, awards: [] }]
  });
});

router.get('/pool', (req: Request, res: Response) => {
  const pool = Array.from({ length: 3 }).map(() => {
    const flavor = generateFlavor();
    const skills = {
      combat: 1 + Math.floor(Math.random() * 2),
      subterfuge: 1 + Math.floor(Math.random() * 2),
      technical: 1 + Math.floor(Math.random() * 2),
      logistics: 1 + Math.floor(Math.random() * 2),
      diplomacy: 1 + Math.floor(Math.random() * 2),
    };
    const age = 20 + Math.floor(Math.random() * 25);
    const seniority = age > 38 ? Seniority.SENIOR : age > 30 ? Seniority.MID : Seniority.JUNIOR;

    return {
      id: Math.random().toString(36).substr(2, 9),
      name: `Recruit ${Math.floor(Math.random() * 1000)}`,
      type: StaffType.HITMAN,
      age,
      seniority,
      experience: seniority === Seniority.SENIOR ? 500 : seniority === Seniority.MID ? 200 : 0,
      skills,
      salary: calculateSalary(skills),
      ...flavor,
      cost: (seniority === Seniority.SENIOR ? 5000 : seniority === Seniority.MID ? 2500 : 500) + Math.floor(Math.random() * 1000),
    };
  });
  res.json(pool);
});

router.post('/recruit', (req: Request, res: Response) => {
  const { name, type } = req.body;
  const flavor = generateFlavor();
  const newStaff: any = {
    id: Math.random().toString(36).substr(2, 9),
    userId: 'user123',
    name: name || 'New Recruit',
    type: type || StaffType.HITMAN,
    age: 20 + Math.floor(Math.random() * 20),
    seniority: Seniority.JUNIOR,
    experience: 0,
    skills: {
      combat: 1,
      subterfuge: 1,
      technical: 1,
      logistics: 1,
      diplomacy: 1,
    },
    status: 'IDLE',
    hireDate: new Date(),
    ...flavor,
    awards: [],
  };
  newStaff.salary = calculateSalary(newStaff.skills);
  mockStaff.push(newStaff);
  res.status(201).json(newStaff);
});

export default router;
