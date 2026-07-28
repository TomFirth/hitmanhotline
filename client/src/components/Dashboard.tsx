import React, { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import StaffCard from './StaffCard';
import CEOInbox from './CEOInbox';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { agency, staff, adminTasks, isOnline, setOnlineStatus, setAgency, setStaff, setAdminTasks } = useGameStore();

  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial fetch if online
    if (isOnline) {
      const fetchData = async () => {
        try {
          const [agencyRes, staffRes, taskRes] = await Promise.all([
            fetch('/api/agency'),
            fetch('/api/staff'),
            fetch('/api/tasks')
          ]);

          let currentAgency = null;
          let currentStaff = [];

          if (agencyRes.ok) currentAgency = await agencyRes.json();
          if (staffRes.ok) currentStaff = await staffRes.json();
          if (taskRes.ok) setAdminTasks(await taskRes.json());

          // Trigger Onboarding if no staff
          if (currentStaff.length === 0) {
            console.log("Initializing fresh agency...");
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
  }, [isOnline, setOnlineStatus, setAgency, setStaff, setAdminTasks]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            {agency?.agencyName || 'Agency'} <span className="text-hitman-red">HQ</span>
          </h1>
          <p className="text-gray-400 text-sm">Welcome back, CEO. Operations are nominal.</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} title={isOnline ? 'Online' : 'Offline'} />
          <div className="bg-hitman-gray px-4 py-2 rounded border border-gray-700">
            <p className="text-[10px] text-gray-500 uppercase">Capital</p>
            <p className="text-xl font-mono text-green-500">${agency?.balance?.toLocaleString()}</p>
          </div>
          <div className="bg-hitman-gray px-4 py-2 rounded border border-gray-700">
            <p className="text-[10px] text-gray-500 uppercase">Prestige</p>
            <p className="text-xl font-mono text-blue-500">{agency?.reputation}</p>
          </div>
          <div className={`px-4 py-2 rounded border transition-colors ${adminTasks.length > 0 ? 'bg-hitman-red border-red-500 animate-pulse' : 'bg-hitman-gray border-gray-700'}`}>
            <p className="text-[10px] text-white/50 uppercase">Red Phone</p>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-white" />
              <span className="text-sm font-black text-white uppercase">{adminTasks.length > 0 ? 'RINGING' : 'READY'}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">Personnel</h2>
              <Link to="/market" className="text-sm bg-hitman-red hover:bg-red-700 text-white px-3 py-1 rounded transition-colors">
                Recruit New Asset
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {staff.map(s => (
                <StaffCard key={s.id} staff={s} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4">Ongoing Operations</h2>
            <div className="bg-hitman-gray p-8 rounded-lg border border-dashed border-gray-600 text-center text-gray-500">
              No active missions. Check the Hotline for contracts.
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4 flex items-center gap-2">
               Communication
               {adminTasks.length > 0 && <span className="bg-hitman-red text-white text-[10px] px-1.5 rounded-full animate-bounce">{adminTasks.length}</span>}
            </h2>
            <CEOInbox />
          </section>

          <section className="bg-black/20 border border-gray-800 p-6 rounded-lg">
             <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Internal News Feed</h3>
             <div className="space-y-4">
                <div className="flex gap-3">
                   <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                   <div>
                      <p className="text-[10px] text-white font-bold uppercase">System Deployment</p>
                      <p className="text-[9px] text-gray-500 italic">Agency OS v1.0.4 successfully deployed to Agency Mainframe.</p>
                   </div>
                </div>
                <div className="flex gap-3 opacity-50">
                   <div className="w-1 h-8 bg-gray-700 rounded-full"></div>
                   <div>
                      <p className="text-[10px] text-white font-bold uppercase">Market Pulse</p>
                      <p className="text-[9px] text-gray-500 italic">Quiet trading observed in the European cyber-sector.</p>
                   </div>
                </div>
             </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
