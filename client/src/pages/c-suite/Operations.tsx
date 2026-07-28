import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Briefcase, Globe, Target, AlertCircle } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import ActiveMissionCard from '../../components/ActiveMissionCard';
import { Mission } from '../../types/game';

const OperationsPage: React.FC = () => {
  const { activeMissions, staff, setActiveMissions, setStaff, setAgency } = useGameStore();
  const [availableMissions, setAvailableMissions] = useState<Mission[]>([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const [availableRes, activeRes] = await Promise.all([
          fetch('/api/missions/available'),
          fetch('/api/missions/active')
        ]);
        if (availableRes.ok) setAvailableMissions(await availableRes.json());
        if (activeRes.ok) setActiveMissions(await activeRes.json());
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };
    fetchMissions();
  }, [setActiveMissions]);

  const handleStartMission = async (missionId: string) => {
    const idleStaff = staff.filter(s => s.status === 'IDLE').slice(0, 1);
    if (idleStaff.length === 0) {
      alert("No idle staff available for this operation.");
      return;
    }

    try {
      const res = await fetch('/api/missions/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          missionId,
          staffIds: idleStaff.map(s => s.id)
        })
      });
      if (res.ok) {
        const newActive = await res.json();
        setActiveMissions([...activeMissions, newActive]);
        // Update local staff status
        const updatedStaff = staff.map(s =>
          idleStaff.find(is => is.id === s.id) ? { ...s, status: 'ON_MISSION' } : s
        );
        // @ts-ignore - status update
        setStaff(updatedStaff);
      }
    } catch (error) {
      console.error('Error starting mission:', error);
    }
  };

  const handleMissionComplete = async (result: any) => {
    // Refresh agency and staff data
    try {
      const [agencyRes, staffRes] = await Promise.all([
        fetch('/api/agency'),
        fetch('/api/staff')
      ]);
      if (agencyRes.ok) setAgency(await agencyRes.json());
      if (staffRes.ok) setStaff(await staffRes.json());

      // Remove from active missions
      setActiveMissions(activeMissions.filter(m => m.id !== result.id));

      // Show result (simple alert for now)
      alert(`Mission Resolved: ${result.status}\nRewards: $${result.rewards?.cash || 0}, ${result.rewards?.xp || 0} XP`);
    } catch (error) {
      console.error('Error syncing after mission completion:', error);
    }
  };
  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-7xl mx-auto pt-20 md:pt-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="text-hitman-red" size={20} />
            <span className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">Office of the COO</span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
            Mission <span className="text-hitman-red">Control</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-hitman-gray border border-gray-800 rounded-lg overflow-hidden h-96 relative group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <Globe size={64} className="text-gray-800 mb-4 animate-[pulse_4s_infinite]" />
                <h3 className="text-white font-bold uppercase tracking-[0.2em] mb-2">Global Heat Map</h3>
                <p className="text-gray-500 text-xs max-w-xs">Sat-link offline. Connecting to shadow network...</p>
                <div className="mt-6 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-hitman-red animate-ping"></div>
                  <div className="w-2 h-2 rounded-full bg-hitman-red animate-ping [animation-delay:0.5s]"></div>
                  <div className="w-2 h-2 rounded-full bg-hitman-red animate-ping [animation-delay:1s]"></div>
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-black/60 px-2 py-1 rounded text-[10px] text-green-500 font-mono">
                COORD: 51.5074° N, 0.1278° W
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-hitman-gray border border-gray-800 p-6 rounded-lg">
                <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                  <Target size={16} className="text-hitman-red" />
                  Available Contracts
                </h3>
                <div className="space-y-4">
                  {availableMissions.map(m => (
                    <div key={m.id} className="p-3 bg-black/20 rounded border border-gray-700 flex justify-between items-center group hover:border-hitman-red transition-all">
                       <div>
                          <p className="text-xs text-white font-bold uppercase">{m.name}</p>
                          <p className="text-[10px] text-gray-500 font-mono tracking-tighter">${m.cashReward} | {m.durationSeconds / 60}m</p>
                       </div>
                       <button
                        onClick={() => handleStartMission(m.id)}
                        className="text-[9px] bg-hitman-red px-2 py-1 rounded text-white font-black hover:bg-red-700 transition-colors uppercase"
                       >
                         Authorize
                       </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-hitman-gray border border-gray-800 p-6 rounded-lg">
                <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                  <AlertCircle size={16} className="text-blue-500" />
                  Active Operations
                </h3>
                <div className="space-y-4">
                  {activeMissions.length > 0 ? (
                    activeMissions.map(am => {
                      const mission = availableMissions.find(m => m.id === am.missionId);
                      const assignedStaff = staff.filter(s => am.staffIds.split(',').includes(s.id));
                      if (!mission) return null;
                      return (
                        <ActiveMissionCard
                          key={am.id}
                          activeMission={am}
                          mission={mission}
                          staff={assignedStaff}
                          onComplete={handleMissionComplete}
                        />
                      );
                    })
                  ) : (
                    <div className="text-center py-10 text-gray-600 text-[10px] uppercase font-bold tracking-widest border border-dashed border-gray-800 rounded">
                      No Assets in Field
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-hitman-gray border border-gray-800 rounded-lg p-6">
              <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4 border-b border-gray-800 pb-2">Operational Alerts</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-1 h-8 bg-hitman-red rounded-full"></div>
                  <div>
                     <p className="text-[10px] text-white font-bold uppercase">System Initialization</p>
                     <p className="text-[9px] text-gray-500">Agency OS is online. Ready for command.</p>
                  </div>
                </div>
                <div className="flex gap-3 opacity-50">
                  <div className="w-1 h-8 bg-gray-700 rounded-full"></div>
                  <div>
                     <p className="text-[10px] text-white font-bold uppercase">Awaiting Intel</p>
                     <p className="text-[9px] text-gray-500">No high-priority targets detected in this sector.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-hitman-red/10 border border-hitman-red/20 rounded-lg p-6">
              <h3 className="text-hitman-red font-bold uppercase text-[10px] tracking-widest mb-2">Protocol Zero</h3>
              <p className="text-[9px] text-gray-400 mb-4">In the event of total agency compromise, initiate shredding procedures immediately.</p>
              <button className="w-full py-2 bg-hitman-red text-white text-[10px] font-black uppercase tracking-tighter hover:bg-red-700 transition-colors">
                Authorize Wipe
              </button>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default OperationsPage;
