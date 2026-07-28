import { Router, Request, Response } from 'express';
import prisma from '../services/db';
import { resolveTask, generateRandomTask } from '../services/adminTaskService';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string || 'mock-user-id';
  const tasks = await prisma.adminTask.findMany({
    where: { userId }
  });

  const parsedTasks = tasks.map(t => ({
    ...t,
    options: JSON.parse(t.options)
  }));

  res.json(parsedTasks);
});

router.post('/resolve', async (req: Request, res: Response) => {
  const { taskId, optionIndex } = req.body;
  try {
    const result = await resolveTask(taskId, optionIndex);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/generate', async (req: Request, res: Response) => {
  const userId = req.body.userId || 'mock-user-id';
  const task = await generateRandomTask(userId);
  res.status(201).json({ ...task, options: JSON.parse(task.options) });
});

export default router;
