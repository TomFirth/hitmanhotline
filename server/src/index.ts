import express, { Request, Response } from 'express';
import staffRoutes from './routes/staff';
import missionRoutes from './routes/missions';
import adminTaskRoutes from './routes/adminTasks';
import userRoutes from './routes/user';
import { startEngine } from './services/missionEngine';
import { startTaskGenerator } from './services/adminTaskService';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

startEngine();
startTaskGenerator();

app.use('/api/staff', staffRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/tasks', adminTaskRoutes);
app.use('/api/user', userRoutes);

app.get('/api/agency', (_req: Request, res: Response) => {
  res.json({
    name: 'The Hotline',
    level: 1,
    hitmen: 1,
    money: 5000,
    reputation: 10,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
