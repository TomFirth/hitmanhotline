import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useGameStore } from '../store/useGameStore';
import StaffCard from '../components/StaffCard';
import { Staff } from '../types/game';

const RecruitmentPage: React.FC = () => {
  const [pool, setPool] = useState<(Staff & { cost: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const { agency, addStaff, deductMoney } = useGameStore();

  const fetchPool = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/staff/pool');
      if (res.ok) {
        setPool(await res.json());
      }
    } catch (error) {
      console.error('Error fetching recruitment pool:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPool();
  }, []);

  const handleHire = (recruit: Staff & { cost: number }) => {
    if (agency.balance < recruit.cost) {
      alert("Insufficient funds for this asset.");
      return;
    }

    if (window.confirm(`Hire ${recruit.name} for $${recruit.cost}?`)) {
      deductMoney(recruit.cost);
      addStaff({ ...recruit, status: 'IDLE', hireDate: new Date().toISOString() });
      setPool(pool.filter(r => r.id !== recruit.id));
    }
  };

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">
              Asset <span className="text-hitman-red">Procurement</span>
            </h1>
            <p className="text-gray-400">Expand your roster with pre-vetted specialists.</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase">Available Capital</p>
            <p className="text-2xl font-mono text-green-500">${agency.balance.toLocaleString()}</p>
          </div>
        </header>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Scanning the deep web for talent...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pool.map(recruit => (
              <div key={recruit.id} className="relative group">
                <StaffCard staff={recruit} />
                <div className="mt-4">
                  <button
                    onClick={() => handleHire(recruit)}
                    disabled={agency.balance < recruit.cost}
                    className={`w-full py-3 rounded font-bold uppercase tracking-widest transition-colors ${
                      agency.balance >= recruit.cost
                        ? 'bg-green-600 hover:bg-green-500 text-white'
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Hire for ${recruit.cost}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <button
            onClick={fetchPool}
            className="text-xs text-gray-500 hover:text-white underline uppercase tracking-widest"
          >
            Refresh Talent Pool
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default RecruitmentPage;
