import { Router, Request, Response } from 'express';
import prisma from '../services/db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string || 'mock-user-id';
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

export default router;
