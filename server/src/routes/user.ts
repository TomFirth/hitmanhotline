import { Router, Request, Response } from 'express';
import prisma from '../services/db';

const router = Router();

router.post('/heartbeat', async (req: Request, res: Response) => {
  const userId = req.body.userId || 'mock-user-id';

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { lastActiveAt: new Date() }
    });
    res.json({ status: 'ok' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/me', async (req: Request, res: Response) => {
  const userId = req.query.userId as string || 'mock-user-id';
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  res.json(user);
});

router.post('/update-profile', async (req: Request, res: Response) => {
  const { userId, username, email, password } = req.body;
  const targetId = userId || 'mock-user-id';

  try {
    const updatedUser = await prisma.user.update({
      where: { id: targetId },
      data: {
        username,
        email,
        password
      }
    });
    res.json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/update-agency', async (req: Request, res: Response) => {
  const { userId, agencyName, entityType, registeredAddress } = req.body;
  const targetId = userId || 'mock-user-id';

  try {
    const updatedUser = await prisma.user.update({
      where: { id: targetId },
      data: {
        agencyName,
        entityType,
        registeredAddress
      }
    });
    res.json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
