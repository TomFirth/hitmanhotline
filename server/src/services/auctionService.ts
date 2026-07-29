import prisma from './db';

export const resolveExpiredAuctions = async () => {
  const now = new Date();

  
  const expiredAuctions = await prisma.staff.findMany({
    where: {
      auctionExpiry: { lte: now }
    },
    include: {
      auctionBids: {
        orderBy: { amount: 'desc' },
        take: 1
      }
    }
  });

  for (const agent of expiredAuctions) {
    const winner = agent.auctionBids[0];

    if (winner) {
      console.log(`Auction Service: Resolving auction for ${agent.name}. Winner: ${winner.userId}`);

      await prisma.$transaction([
        
        prisma.staff.update({
          where: { id: agent.id },
          data: {
            userId: winner.userId,
            auctionExpiry: null,
            startingPrice: null,
            hireDate: new Date()
          }
        }),
        
        prisma.user.update({
          where: { id: agent.userId },
          data: { balance: { increment: winner.amount } }
        }),
        
        prisma.user.update({
          where: { id: winner.userId },
          data: { escrowBalance: { decrement: winner.amount } }
        }),
        
        prisma.auctionBid.deleteMany({ where: { staffId: agent.id } })
      ]);
    } else {
      
      console.log(`Auction Service: No bids for ${agent.name}. Ending auction.`);
      await prisma.staff.update({
        where: { id: agent.id },
        data: {
          auctionExpiry: null,
          startingPrice: null
        }
      });
    }
  }

  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const staleMarketAssets = await prisma.staff.findMany({
    where: {
      userId: 'market-user-id',
      hireDate: { lte: sevenDaysAgo }
    }
  });

  if (staleMarketAssets.length > 0) {
    console.log(`Auction Service: Deleting ${staleMarketAssets.length} stale market assets.`);
    await prisma.staff.deleteMany({
      where: {
        id: { in: staleMarketAssets.map(a => a.id) }
      }
    });
  }
};

export const startAuctionEngine = () => {
  console.log('Auction Service Initialised [Mode: Background Ticker]');
  setInterval(async () => {
    try {
      await resolveExpiredAuctions();
    } catch (error) {
      console.error('Auction Service Error:', error);
    }
  }, 60000); 
};
