import React, { useEffect, useState, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';
import StaffCard from './StaffCard';
import CEOInbox from './CEOInbox';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import ActiveMissionCard from './ActiveMissionCard';

const Dashboard: React.FC = () => {
  const {
    agency, staff, activeMissions, missionTemplates, isOnline,
    setOnlineStatus, setAgency, setStaff, setAdminTasks, setActiveMissions, setMissionTemplates
  } = useGameStore();

  const [marketCount, setMarketCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (isOnline) {
      const fetchData = async () => {
        try {
          const [agencyRes, staffRes, taskRes, activeMissionsRes, marketRes, availableRes, allMissionsRes] = await Promise.all([
            fetch('/api/user/me?userId=mock-user-id'),
            fetch('/api/staff'),
            fetch('/api/tasks'),
            fetch('/api/missions/active'),
            fetch('/api/staff/pool'),
            fetch('/api/missions/available'),
            fetch('/api/missions/available') // We use this as templates for now
          ]);

          let currentAgency = null;
          let currentStaff = [];

          if (agencyRes.ok) currentAgency = await agencyRes.json();
          if (staffRes.ok) currentStaff = await staffRes.json();

          if (currentStaff.length === 0) {
            const initRes = await fetch('/api/staff/init-agency', { method: 'POST' });
            if (initRes.ok) {
              const initData = await initRes.json();
              setAgency(initData.user);
              setStaff(initData.staff);
            }
          } else {
            if (currentAgency) setAgency(currentAgency);
            setStaff(currentStaff);
          }

          if (taskRes.ok) setAdminTasks(await taskRes.json());
          if (activeMissionsRes.ok) setActiveMissions(await activeMissionsRes.json());
          if (marketRes.ok) setMarketCount((await marketRes.json()).length);
          if (allMissionsRes.ok) setMissionTemplates(await allMissionsRes.json());
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        }
      };
      fetchData();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline, setOnlineStatus, setAgency, setStaff, setAdminTasks, setActiveMissions, setMissionTemplates]);

  const weeklyOutgoings = staff.reduce((acc, s) => acc + (s.salary * 7), 0);

  const sortedActive = [...activeMissions]
    .sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime())
    .slice(0, 3);

  const incomingForecast = activeMissions.reduce((acc, am) => {
    const mission = missionTemplates.find(m => m.id === am.missionId);
    return acc + (mission?.cashReward || 0);
  }, 0);

  const handleMissionComplete = useCallback(async () => {
    try {
      const [agencyRes, staffRes, activeRes] = await Promise.all([
        fetch('/api/user/me?userId=mock-user-id'),
        fetch('/api/staff'),
        fetch('/api/missions/active')
      ]);
      if (agencyRes.ok) setAgency(await agencyRes.json());
      if (staffRes.ok) setStaff(await staffRes.json());
      if (activeRes.ok) setActiveMissions(await activeRes.json());
    } catch (error) {
      console.error('Error syncing after mission completion:', error);
    }
  }, [setAgency, setStaff, setActiveMissions]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            {agency?.agencyName || 'Agency'} <span className="text-hitman-red">HQ</span>
          </h1>
          <p className="text-gray-400 text-sm">CEO Dashboard: Strategic Oversight</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} title={isOnline ? 'Online' : 'Offline'} />
          <div className="bg-hitman-gray px-4 py-2 rounded border border-gray-800">
            <p className="text-[10px] text-gray-500 uppercase font-black">Capital</p>
            <p className="text-xl font-mono text-green-500">${agency?.balance?.toLocaleString() || 0}</p>
          </div>
          <div className="bg-hitman-gray px-4 py-2 rounded border border-gray-800">
            <p className="text-[10px] text-gray-500 uppercase font-black">Incoming</p>
            <p className="text-xl font-mono text-blue-500">+${incomingForecast.toLocaleString()}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">Personnel</h2>
              <Link to="/market" className="text-sm bg-hitman-red hover:bg-red-700 text-white px-3 py-1 rounded transition-colours">
                Recruit New Asset
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {staff.length > 0 ? (
                staff.slice(0, 4).map(s => (
                  <StaffCard key={s.id} staff={s} />
                ))
              ) : (
                <div className="col-span-2 h-40 border border-dashed border-gray-700 rounded flex items-center justify-center text-gray-500 italic text-xs">
                  Awaiting operative clearance...
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4">Active Operations</h2>
            <div className="grid grid-cols-1 gap-4">
              {sortedActive.length > 0 ? (
                sortedActive.map(am => {
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
                <div className="h-40 bg-hitman-gray/20 border border-dashed border-gray-700 rounded flex flex-col items-center justify-center text-center p-4">
                   <Briefcase size={24} className="text-gray-800 mb-2" />
                   <p className="text-[10px] text-gray-600 uppercase font-bold">No agents in field</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 flex items-center gap-2">
               Director Communications
            </h2>
            <CEOInbox />
          </section>

          <section className="bg-hitman-gray border border-gray-800 rounded-lg p-6">
             <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Agency Pulse</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-gray-800 pb-2">
                   <div>
                      <p className="text-[8px] text-gray-500 uppercase">Weekly Burn</p>
                      <p className="text-sm font-bold text-red-500">-${weeklyOutgoings.toLocaleString()}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[8px] text-gray-500 uppercase">Market Supply</p>
                      <p className="text-sm font-bold text-white">{marketCount} Assets</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <p className="text-[9px] text-gray-400 uppercase tracking-widest">Mainframe Operational</p>
                </div>
             </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
