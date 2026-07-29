import React, { useState } from 'react';
import { Staff, Seniority } from '../types/game';
import { Shield, Hammer, Gavel, Trash2, UserPlus, Timer } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import '../styles/components.css';

interface StaffCardProps {
  staff: Staff;
  onAction?: () => void;
}

const SeniorityBadge: React.FC<{ seniority: Seniority }> = ({ seniority }) => {
  const colours = {
    [Seniority.JUNIOR]: 'text-gray-400',
    [Seniority.MID]: 'text-blue-400',
    [Seniority.SENIOR]: 'text-hitman-red',
    [Seniority.EXECUTIVE]: 'text-yellow-500',
  };

  return (
    <div className={`flex gap-0.5 ${colours[seniority]}`}>
      <Shield size={10} fill="currentColor" />
      {(seniority === Seniority.MID || seniority === Seniority.SENIOR || seniority === Seniority.EXECUTIVE) && <Shield size={10} fill="currentColor" />}
      {(seniority === Seniority.SENIOR || seniority === Seniority.EXECUTIVE) && <Shield size={10} fill="currentColor" />}
      {seniority === Seniority.EXECUTIVE && <Shield size={10} fill="currentColor" />}
    </div>
  );
};

const StaffCard: React.FC<StaffCardProps> = ({ staff, onAction }) => {
  const { agency, setAgency, setStaff } = useGameStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [bidAmount, setBidAmount] = useState<number>(0);

  const isEmployeeOfMonth = staff.awards?.includes('Employee of the Month');
  const isOnMarket = staff.userId === 'market-user-id';
  const isMine = staff.userId === agency.id;
  const isAuction = !!staff.auctionExpiry && new Date(staff.auctionExpiry) > new Date();

  
  const skills = staff.skills || {
    combat: (staff as any).combat || 0,
    subterfuge: (staff as any).subterfuge || 0,
    technical: (staff as any).technical || 0,
    logistics: (staff as any).logistics || 0,
    diplomacy: (staff as any).diplomacy || 0,
  };

  const handleHire = async () => {
    if (agency.balance < (staff as any).cost) {
      alert("Insufficient funds.");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch(`/api/staff/hire/${staff.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: agency.id, cost: (staff as any).cost })
      });

      if (res.ok) {
        const agencyRes = await fetch('/api/agency');
        const staffRes = await fetch('/api/staff');
        if (agencyRes.ok) setAgency(await agencyRes.json());
        if (staffRes.ok) setStaff(await staffRes.json());
        onAction?.();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFire = async () => {
    if (!window.confirm(`Terminate contract for ${staff.name}? No severance will be paid.`)) return;

    setIsProcessing(true);
    try {
      const res = await fetch(`/api/staff/fire/${staff.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: agency.id })
      });

      if (res.ok) {
        const staffRes = await fetch('/api/staff');
        if (staffRes.ok) setStaff(await staffRes.json());
        onAction?.();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSell = async () => {
    const price = prompt("Enter starting auction price ($):", "1000");
    const duration = prompt("Enter duration in days (1, 3, 5, or 7):", "3");

    if (!price || !duration) return;

    setIsProcessing(true);
    try {
      const res = await fetch('/api/auction/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffId: staff.id,
          userId: agency.id,
          startingPrice: parseInt(price),
          durationDays: parseInt(duration)
        })
      });

      if (res.ok) {
        const staffRes = await fetch('/api/staff');
        if (staffRes.ok) setStaff(await staffRes.json());
        onAction?.();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBid = async () => {
    if (!bidAmount || bidAmount <= 0) return;

    setIsProcessing(true);
    try {
      const res = await fetch('/api/auction/bid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffId: staff.id,
          userId: agency.id,
          amount: bidAmount
        })
      });

      if (res.ok) {
        alert("Bid placed successfully!");
        onAction?.();
      } else {
        const err = await res.json();
        alert(err.error);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const highestBid = staff.auctionBids?.[0]?.amount || staff.startingPrice;

  return (
    <div className={`staff-card relative ${
      isEmployeeOfMonth ? 'staff-card-awarded' : 'staff-card-default'
    }`}>
      {isAuction && (
        <div className="absolute -top-2 -right-2 bg-hitman-red text-white text-[8px] font-black px-2 py-1 rounded shadow-lg flex items-center gap-1 z-10">
          <Gavel size={10} /> AUCTION ACTIVE
        </div>
      )}

      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-3">
          <div className="staff-avatar">
            <svg className="w-10 h-10 text-gray-700 mt-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div>
            <h3 className="staff-name-container text-white font-bold text-xl">
              {staff.name}
              {isEmployeeOfMonth && (
                <span title="Employee of the Month" className="award-star"></span>
              )}
            </h3>
            <div className="flex items-center gap-2">
              <span className="staff-type-badge">
                {staff.type}
              </span>
              <SeniorityBadge seniority={staff.seniority} />
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Age: {staff.age}</p>
          <p className="staff-salary">
            {isAuction ? `Bid: $${highestBid}` : `$${staff.salary}/day`}
          </p>
        </div>
      </div>

      {isAuction && (
        <div className="mt-2 bg-black/40 p-2 rounded border border-gray-800 flex justify-between items-center">
           <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
              <Timer size={12} className="text-hitman-red" />
              <span>Ends: {new Date(staff.auctionExpiry!).toLocaleDateString()}</span>
           </div>
           {!isMine && (
             <div className="flex gap-1">
                <input
                  type="number"
                  className="w-16 bg-black border border-gray-700 rounded text-[10px] px-1 text-white"
                  placeholder="Amt"
                  onChange={(e) => setBidAmount(parseInt(e.target.value))}
                />
                <button
                  onClick={handleBid}
                  disabled={isProcessing}
                  className="bg-green-600 px-2 py-1 rounded text-[8px] font-black text-white uppercase hover:bg-green-500"
                >
                  Bid
                </button>
             </div>
           )}
        </div>
      )}

      {staff.previousJob && (
        <div className="mt-2 text-[10px] text-gray-400 italic">
          Prev: {staff.previousJob}
        </div>
      )}

      {staff.quirk && (
        <div className="mt-1 text-[10px] text-hitman-red font-bold uppercase tracking-tighter">
          QUIRK: {staff.quirk}
        </div>
      )}

      <div className="mt-4">
        <div className="flex justify-between text-[8px] uppercase font-bold text-gray-500 mb-1">
          <span>Exp: {staff.experience}</span>
          <span>Next Tier</span>
        </div>
        <div className="exp-bar-container">
          <div
            className="exp-bar-fill"
            style={{ width: `${Math.min((staff.experience % 1000) / 10, 100)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {Object.entries(skills).map(([skill, value]) => (
          <div key={skill} className="flex flex-col">
            <span className="text-[10px] uppercase text-gray-500">{skill}</span>
            <div className="skill-bar-container">
              <div
                className="skill-bar-fill"
                style={{ width: `${(Number(value) / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className={`status-badge ${
          staff.status === 'IDLE' ? 'bg-green-900 text-green-300' :
          staff.status === 'ON_MISSION' ? 'bg-blue-900 text-blue-300' : 'bg-red-900 text-red-300'
        }`}>
          {staff.status}
        </span>

        <div className="flex gap-2">
          {isMine && !isAuction && (
            <>
              <button
                onClick={handleSell}
                disabled={isProcessing}
                className="flex items-center gap-1 text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase transition-colours"
              >
                <Hammer size={12} /> Sell
              </button>
              <button
                onClick={handleFire}
                disabled={isProcessing}
                className="flex items-center gap-1 text-[10px] font-black text-hitman-red hover:text-red-400 uppercase transition-colours"
              >
                <Trash2 size={12} /> Fire
              </button>
            </>
          )}
          {isOnMarket && !isAuction && (
             <button
              onClick={handleHire}
              disabled={isProcessing}
              className="flex items-center gap-1 text-[10px] font-black text-green-500 hover:text-green-400 uppercase transition-colours"
            >
               <UserPlus size={12} /> Hire
            </button>
          )}
          <button className="text-xs text-gray-400 hover:text-white underline">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
