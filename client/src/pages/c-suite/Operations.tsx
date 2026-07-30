import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/Layout';
import { Briefcase, Target, AlertCircle, Shield, Users, CheckCircle2 } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import ActiveMissionCard from '../../components/ActiveMissionCard';
import { Mission, StaffType } from '../../types/game';
import HelpOverlay from '../../components/HelpOverlay';
import '../../styles/pages.css';

const OperationsPage: React.FC = () => {
  const { activeMissions, archivedMissions, missionTemplates, staff, setActiveMissions, setArchivedMissions, setMissionTemplates, setStaff, setAgency } = useGameStore();
  const [availableMissions, setAvailableMissions] = useState<Mission[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const fetchMissions = useCallback(async () => {
    try {
      const [availableRes, activeRes, allMissionsRes] = await Promise.all([
        fetch('/api/missions/available'),
        fetch('/api/missions/active'),
        fetch('/api/missions/available')
      ]);
      if (availableRes.ok && activeRes.ok) {
        const available = await availableRes.json();
        const active = await activeRes.json();

        const activeMissionIds = active.map((m: any) => m.missionId);
        setAvailableMissions(available.filter((m: any) => !activeMissionIds.includes(m.id)));

        setActiveMissions(active.filter((m: any) => m.status === 'IN_PROGRESS'));
        setArchivedMissions(active.filter((m: any) => m.status !== 'IN_PROGRESS'));
      }
      if (allMissionsRes.ok) setMissionTemplates(await allMissionsRes.json());
    } catch (error) {
      console.error('Error fetching missions:', error);
    }
  }, [setActiveMissions, setArchivedMissions, setMissionTemplates]);

  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

  const handleStartMission = async (missionId: string) => {
    const mission = availableMissions.find(m => m.id === missionId);
    if (!mission) return;

    const idleStaff = staff.filter(s => s.status === 'IDLE' && s.type === StaffType.HITMAN).slice(0, 1);
    if (idleStaff.length === 0) {
      alert("No idle field agents (Hitmen) available for this operation.");
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
        await fetchMissions();
        setSelectedMission(null);
      }
    } catch (error) {
      console.error('Error starting mission:', error);
    }
  };

  const handleMissionComplete = useCallback(async () => {
    try {
      const [agencyRes, staffRes] = await Promise.all([
        fetch('/api/user/me?userId=mock-user-id'),
        fetch('/api/staff')
      ]);
      if (agencyRes.ok) setAgency(await agencyRes.json());
      if (staffRes.ok) setStaff(await staffRes.json());

      await fetchMissions();
    } catch (error) {
      console.error('Error syncing after mission completion:', error);
    }
  }, [setAgency, setStaff, fetchMissions]);

  return (
    <Layout>
      <HelpOverlay context="OPERATIONS" />
      <div className="page-layout">
        <header className="section-header">
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="text-hitman-red" size={20} />
            <span className="office-header">Office of the COO</span>
          </div>
          <h1 className="page-title">
            Mission <span className="text-hitman-red">Control</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-hitman-gray border border-gray-800 p-6 rounded-lg h-[600px] flex flex-col">
                <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                  <Target size={16} className="text-hitman-red" />
                  Available Contracts
                </h3>
                <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                  {availableMissions.map(m => (
                    <div
                      key={m.id}
                      className={`p-3 rounded border transition-all cursor-pointer ${
                        selectedMission?.id === m.id
                          ? 'bg-hitman-red/20 border-hitman-red shadow-[0_0_10px_rgba(139,0,0,0.2)]'
                          : 'bg-black/20 border-gray-700 hover:border-gray-500'
                      }`}
                      onClick={() => setSelectedMission(m)}
                    >
                       <div className="flex justify-between items-center">
                          <div>
                             <p className="text-xs text-white font-bold uppercase">{m.name}</p>
                             <p className="text-[10px] text-gray-500 font-mono tracking-tighter">${m.cashReward} | {m.durationSeconds / 60}m</p>
                          </div>
                          <span className="text-[9px] font-black text-hitman-red uppercase tracking-widest">Select</span>
                       </div>
                    </div>
                  ))}
                  {availableMissions.length === 0 && (
                    <div className="text-center py-20 text-gray-600 text-[10px] uppercase font-bold tracking-widest">
                       Mission Board Empty
                    </div>
                  )}
                </div>
              </section>

              <section className="bg-hitman-gray border border-gray-800 rounded-lg p-6 h-[600px] flex flex-col">
                 <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                   <Shield size={16} className="text-blue-500" />
                   Mission Briefing
                 </h3>
                 {selectedMission ? (
                   <div className="flex flex-1 flex-col animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="mb-6">
                         <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">{selectedMission.name}</h2>
                         <div className="inline-block bg-hitman-red/10 text-hitman-red text-[10px] font-black px-2 py-0.5 rounded border border-hitman-red/20 uppercase tracking-widest">
                            {selectedMission.type}
                         </div>
                      </div>

                      <div className="bg-black/30 p-4 rounded border border-gray-800 mb-6 flex-1">
                         <p className="text-xs text-gray-400 font-serif italic leading-relaxed mb-6">"{selectedMission.description}"</p>

                         <div className="space-y-4">
                            <div>
                               <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-1">Authorisation Requirements</p>
                               <div className="flex gap-2">
                                  <div className="bg-hitman-gray border border-gray-700 px-3 py-1.5 rounded flex items-center gap-2">
                                     <Users size={12} className="text-gray-500" />
                                     <span className="text-[10px] text-white font-bold uppercase">1x Field Agent</span>
                                  </div>
                               </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                               <div>
                                  <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-1">Expected Payout</p>
                                  <p className="text-lg font-mono text-green-500">${selectedMission.cashReward.toLocaleString()}</p>
                               </div>
                               <div>
                                  <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-1">Risk Profile</p>
                                  <p className={`text-lg font-mono ${selectedMission.riskLevel > 0 ? 'text-hitman-red' : 'text-blue-500'}`}>
                                     {selectedMission.riskLevel > 0 ? `LEVEL ${selectedMission.riskLevel}` : 'NEGLIGIBLE'}
                                  </p>
                               </div>
                            </div>
                         </div>
                      </div>

                      <button
                        onClick={() => handleStartMission(selectedMission.id)}
                        className="w-full py-4 bg-hitman-red hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] italic text-sm transition-all shadow-[0_0_15px_rgba(139,0,0,0.3)]"
                      >
                         Authorise Operation
                      </button>
                   </div>
                 ) : (
                   <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
                      <Briefcase size={48} className="mb-4 text-gray-700" />
                      <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500">Select a target to view intelligence briefing</p>
                   </div>
                 )}
              </section>
            </div>

            <section className="bg-hitman-gray border border-gray-800 p-6 rounded-lg">
              <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                Operational Archive
              </h3>
              <div className="space-y-4">
                {archivedMissions.map(am => {
                  const template = missionTemplates.find(t => t.id === am.missionId);
                  return (
                    <div key={am.id} className="bg-black/20 border border-gray-800 p-4 rounded-lg flex flex-col gap-3 group hover:border-gray-600 transition-colors">
                      <div className="flex justify-between items-start">
                         <div>
                            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Post-Operation Report</p>
                            <h4 className="text-sm text-white font-bold uppercase tracking-tight">{template?.name || 'Unknown Op'}</h4>
                         </div>
                         <div className="flex flex-col items-end">
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${am.status === 'SUCCESS' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                               {am.status}
                            </span>
                            <p className="text-[8px] text-gray-600 mt-1 font-mono uppercase">{new Date(am.endTime).toLocaleString()}</p>
                         </div>
                      </div>

                      <div className="bg-black/40 p-3 rounded border border-gray-800/50">
                         <p className="text-xs text-gray-400 font-serif italic">"{am.outcomeDetails || 'Debrief information classified.'}"</p>
                      </div>

                      <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-gray-500">
                         <div className="flex items-center gap-2">
                            <Users size={12} className="text-gray-600" />
                            <span>Unit Extraction: {(am.status === 'CAPTURED' || am.status === 'DECEASED') ? 'COMPROMISED' : 'COMPLETED'}</span>
                         </div>
                         <span className={am.status === 'SUCCESS' ? 'text-green-900' : 'text-gray-800'}>
                            {am.status === 'SUCCESS' ? 'PAYOUT SECURED' : 'PAYOUT DENIED'}
                         </span>
                      </div>
                    </div>
                  );
                })}
                {archivedMissions.length === 0 && (
                   <div className="py-20 text-center text-[10px] text-gray-600 uppercase font-bold tracking-widest border border-dashed border-gray-800 rounded">
                      Archive Empty
                   </div>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
             <section className="bg-hitman-gray border border-gray-800 p-6 rounded-lg">
                <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                  <AlertCircle size={16} className="text-blue-500" />
                  Active Operations
                </h3>
                <div className="space-y-4">
                  {activeMissions.length > 0 ? (
                    activeMissions.map(am => {
                      const mission = missionTemplates.find(m => m.id === am.missionId);
                      const assignedStaff = staff.filter(s => am.staffIds.split(',').includes(s.id));
                      return (
                        <ActiveMissionCard
                          key={am.id}
                          activeMission={am}
                          mission={mission || { name: 'Field Op', durationSeconds: 0 } as any}
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
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default OperationsPage;
