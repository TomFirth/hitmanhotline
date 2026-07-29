import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import { useGameStore } from '../store/useGameStore';
import StaffCard from '../components/StaffCard';
import { Staff, StaffType } from '../types/game';
import { Search, Filter, X } from 'lucide-react';
import HelpOverlay from '../components/HelpOverlay';

interface RecruitmentPageBaseProps {
  title: string;
  typeGroup: 'AGENT' | 'STAFF';
}

const RecruitmentPageBase: React.FC<RecruitmentPageBaseProps> = ({ title, typeGroup }) => {
  const [pool, setPool] = useState<(Staff & { cost: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    minCombat: 0,
    minTechnical: 0,
    minDiplomacy: 0,
    role: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const { agency, addStaff, deductMoney } = useGameStore();

  const fetchPool = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        typeGroup,
        search,
        minCombat: filters.minCombat.toString(),
        minTechnical: filters.minTechnical.toString(),
        minDiplomacy: filters.minDiplomacy.toString(),
        role: filters.role
      });

      const res = await fetch(`/api/staff/pool?${params.toString()}`);
      if (res.ok) {
        setPool(await res.json());
      }
    } catch (error) {
      console.error('Error fetching recruitment pool:', error);
    } finally {
      setLoading(false);
    }
  }, [typeGroup, search, filters.minCombat, filters.minTechnical, filters.minDiplomacy, filters.role]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPool();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchPool]);

  const handleHire = (recruit: Staff & { cost: number }) => {
    if ((agency?.balance || 0) < recruit.cost) {
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
      <HelpOverlay context="RECRUITMENT" />
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">
              {title} <span className="text-hitman-red">Procurement</span>
            </h1>
            <p className="text-gray-400">Expand your roster with pre-vetted specialists.</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase">Available Capital</p>
            <p className="text-2xl font-mono text-green-500">${(agency?.balance || 0).toLocaleString()}</p>
          </div>
        </header>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search by name or flavour..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-hitman-gray border border-gray-800 rounded px-10 py-2 text-sm text-white focus:border-hitman-red outline-none transition-colours"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold uppercase tracking-widest border transition-colours ${
              showFilters ? 'bg-hitman-red border-hitman-red text-white' : 'bg-hitman-gray border-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Filter size={14} />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mb-8 p-6 bg-hitman-black/40 border border-gray-800 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Min Combat</label>
              <input
                type="range" min="0" max="10"
                value={filters.minCombat}
                onChange={(e) => setFilters({...filters, minCombat: parseInt(e.target.value)})}
                className="w-full accent-hitman-red"
              />
              <div className="flex justify-between text-[10px] text-gray-600 mt-1"><span>0</span><span>{filters.minCombat}</span><span>10</span></div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Min Technical</label>
              <input
                type="range" min="0" max="10"
                value={filters.minTechnical}
                onChange={(e) => setFilters({...filters, minTechnical: parseInt(e.target.value)})}
                className="w-full accent-hitman-red"
              />
              <div className="flex justify-between text-[10px] text-gray-600 mt-1"><span>0</span><span>{filters.minTechnical}</span><span>10</span></div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Min Diplomacy</label>
              <input
                type="range" min="0" max="10"
                value={filters.minDiplomacy}
                onChange={(e) => setFilters({...filters, minDiplomacy: parseInt(e.target.value)})}
                className="w-full accent-hitman-red"
              />
              <div className="flex justify-between text-[10px] text-gray-600 mt-1"><span>0</span><span>{filters.minDiplomacy}</span><span>10</span></div>
            </div>
            {typeGroup === 'STAFF' && (
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Speciality Role</label>
                <select
                  value={filters.role}
                  onChange={(e) => setFilters({...filters, role: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded px-2 py-1.5 text-xs text-white focus:border-hitman-red outline-none"
                >
                  <option value="">All Support Staff</option>
                  {Object.values(StaffType).filter(t => t !== StaffType.HITMAN).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="md:col-span-4 flex justify-end">
              <button
                onClick={() => setFilters({ minCombat: 0, minTechnical: 0, minDiplomacy: 0, role: '' })}
                className="text-[10px] text-gray-500 hover:text-white uppercase font-bold tracking-widest flex items-center gap-1"
              >
                <X size={10} /> Reset Filters
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-gray-500">Scanning the deep web for talent...</div>
        ) : pool.length === 0 ? (
          <div className="text-center py-40 border border-dashed border-gray-800 rounded-lg">
            <Search size={48} className="mx-auto text-gray-800 mb-4" />
            <h3 className="text-white font-bold uppercase tracking-widest mb-2">No Results Found</h3>
            <p className="text-gray-600 text-xs mb-6">Our scouts couldn't find anyone matching your specific criteria.</p>
            <button
              onClick={fetchPool}
              className="px-6 py-2 bg-hitman-gray border border-gray-700 rounded text-[10px] font-black uppercase tracking-widest text-white hover:border-hitman-red transition-all"
            >
              Force Market Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pool.map(recruit => (
              <StaffCard key={recruit.id} staff={recruit} onAction={fetchPool} />
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

export default RecruitmentPageBase;
