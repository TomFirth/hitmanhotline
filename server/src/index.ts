import express, { Request, Response } from 'express';
import cors from 'cors';
import staffRoutes from './routes/staff';
import missionRoutes from './routes/missions';
import adminTaskRoutes from './routes/adminTasks';
import userRoutes from './routes/user';
import auctionRoutes from './routes/auction';
import { startEngine } from './services/missionEngine';
import { startTaskGenerator } from './services/adminTaskService';
import { ensureMinimumContent } from './services/populationService';
import { processSalaryReviews } from './services/salaryService';
import { startAuctionEngine } from './services/auctionService';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

startEngine();
startTaskGenerator();
startAuctionEngine();
ensureMinimumContent().catch(console.error);
processSalaryReviews().catch(console.error);

app.use('/api/staff', staffRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/tasks', adminTaskRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auction', auctionRoutes);

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
