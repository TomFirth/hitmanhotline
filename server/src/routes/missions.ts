import { Router, Request, Response } from 'express';
import prisma from '../services/db';
import { generateMissionPool } from '../services/missionGenerator';

const router = Router();

router.post('/refresh', async (req: Request, res: Response) => {
  const count = 10;
  const missions = generateMissionPool(count);

  await prisma.mission.deleteMany();

  const created = [];
  for (const m of missions) {
    created.push(await prisma.mission.create({ data: m }));
  }

  res.json(created);
});

router.get('/available', async (req: Request, res: Response) => {
  const missions = await prisma.mission.findMany();
  res.json(missions);
});

router.get('/active', async (req: Request, res: Response) => {
  const active = await prisma.activeMission.findMany({
    where: { status: 'IN_PROGRESS' }
  });
  res.json(active);
});

router.post('/start', async (req: Request, res: Response) => {
  const { missionId, staffIds, userId } = req.body;

  const mission = await prisma.mission.findUnique({ where: { id: missionId } });
  if (!mission) return res.status(404).json({ error: 'Mission not found' });

  const targetUserId = userId || 'mock-user-id';

  
  const user = await prisma.user.findUnique({ where: { id: targetUserId } });
  if (!user) {
    return res.status(403).json({ error: 'User registration not found. Please re-initialise.' });
  }

  const activeMission = await prisma.activeMission.create({
    data: {
      missionId,
      userId: targetUserId,
      staffIds: staffIds.join(','),
      startTime: new Date(),
      endTime: new Date(Date.now() + mission.durationSeconds * 1000),
      status: 'IN_PROGRESS'
    }
  });

  await prisma.staff.updateMany({
    where: { id: { in: staffIds } },
    data: { status: 'ON_MISSION' }
  });

  res.status(201).json(activeMission);
});

router.get('/status/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const activeMission = await prisma.activeMission.findUnique({
    where: { id: id as string }
  });
  res.json(activeMission);
});

export default router;
