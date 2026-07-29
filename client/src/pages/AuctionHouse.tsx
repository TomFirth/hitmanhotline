import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useGameStore } from '../store/useGameStore';
import StaffCard from '../components/StaffCard';
import { Staff } from '../types/game';
import { Gavel, Info } from 'lucide-react';
import HelpOverlay from '../components/HelpOverlay';

const AuctionHouse: React.FC = () => {
  const [auctions, setAuctions] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const { agency } = useGameStore();

  const fetchAuctions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auction/active');
      if (res.ok) {
        setAuctions(await res.json());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  return (
    <Layout>
      <HelpOverlay context="RECRUITMENT" />
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">
              Auction <span className="text-hitman-red">House</span>
            </h1>
            <p className="text-gray-400">Bid on elite assets from other player agencies.</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase">Available Capital</p>
            <p className="text-2xl font-mono text-green-500">${(agency?.balance || 0).toLocaleString()}</p>
          </div>
        </header>

        <div className="mb-8 bg-blue-900/20 border border-blue-800 p-4 rounded flex gap-4 items-center">
           <Info className="text-blue-400 shrink-0" size={24} />
           <p className="text-xs text-blue-300">
             All bids are held in **Escrow**. If you are outbid, your capital is instantly returned to your balance.
             Auctions cannot be cancelled once a bid has been placed.
           </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-mono animate-pulse">CONNECTING TO GLOBAL GAVEL NETWORK...</div>
        ) : auctions.length === 0 ? (
          <div className="text-center py-40 border border-dashed border-gray-800 rounded-lg">
            <Gavel size={48} className="mx-auto text-gray-800 mb-4" />
            <h3 className="text-white font-bold uppercase tracking-widest mb-2">No Active Auctions</h3>
            <p className="text-gray-600 text-xs">Check back later for user-listed assets.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.map(agent => (
              <StaffCard key={agent.id} staff={agent} onAction={fetchAuctions} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AuctionHouse;
