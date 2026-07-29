import { Router, Request, Response } from 'express';
import prisma from '../services/db';

const router = Router();

router.get('/active', async (req: Request, res: Response) => {
  try {
    const auctions = await prisma.staff.findMany({
      where: {
        auctionExpiry: { gt: new Date() }
      },
      include: {
        auctionBids: {
          orderBy: { amount: 'desc' },
          take: 1,
          include: { user: true }
        }
      }
    });
    res.json(auctions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/sell', async (req: Request, res: Response) => {
  const { staffId, userId, startingPrice, durationDays } = req.body;
  const targetUserId = userId || 'mock-user-id';

  try {
    const agent = await prisma.staff.findUnique({ where: { id: staffId } });
    if (!agent || agent.userId !== targetUserId) {
      return res.status(403).json({ error: 'Unauthorised: You do not own this asset' });
    }

    if (agent.status !== 'IDLE') {
      return res.status(400).json({ error: 'Asset must be IDLE to be listed for auction' });
    }

    const expiry = new Date();
    expiry.setDate(expiry.getDate() + (durationDays || 3));

    const updated = await prisma.staff.update({
      where: { id: staffId },
      data: {
        auctionExpiry: expiry,
        startingPrice: startingPrice || 1000,
        status: 'IDLE' 
      }
    });

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/bid', async (req: Request, res: Response) => {
  const { staffId, userId, amount } = req.body;
  const bidderId = userId || 'mock-user-id';

  try {
    const agent = await prisma.staff.findUnique({
      where: { id: staffId },
      include: {
        auctionBids: {
          orderBy: { amount: 'desc' },
          take: 1
        }
      }
    });

    if (!agent || !agent.auctionExpiry || agent.auctionExpiry < new Date()) {
      return res.status(400).json({ error: 'Auction is not active' });
    }

    if (agent.userId === bidderId) {
      return res.status(400).json({ error: 'You cannot bid on your own asset' });
    }

    const currentHighest = agent.auctionBids[0];
    const minBid = currentHighest ? currentHighest.amount + 100 : (agent.startingPrice || 0);

    if (amount < minBid) {
      return res.status(400).json({ error: `Bid must be at least $${minBid}` });
    }

    const bidder = await prisma.user.findUnique({ where: { id: bidderId } });
    if (!bidder || bidder.balance < amount) {
      return res.status(400).json({ error: 'Insufficient capital for this bid' });
    }

    
    
    
    
    await prisma.$transaction(async (tx) => {
      if (currentHighest) {
        await tx.user.update({
          where: { id: currentHighest.userId },
          data: {
            balance: { increment: currentHighest.amount },
            escrowBalance: { decrement: currentHighest.amount }
          }
        });
      }

      await tx.user.update({
        where: { id: bidderId },
        data: {
          balance: { decrement: amount },
          escrowBalance: { increment: amount }
        }
      });

      await tx.auctionBid.create({
        data: {
          userId: bidderId,
          staffId,
          amount
        }
      });
    });

    res.json({ message: 'Bid placed successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
