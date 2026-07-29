import React from 'react';
import Layout from '../../components/Layout';
import { useGameStore } from '../../store/useGameStore';
import { Users, UserPlus, MessageSquare, Coffee } from 'lucide-react';
import StaffCard from '../../components/StaffCard';
import HelpOverlay from '../../components/HelpOverlay';

const HRPage: React.FC = () => {
  const { staff, setStaff, setAgency } = useGameStore();

  const refreshData = async () => {
    const [staffRes, agencyRes] = await Promise.all([
      fetch('/api/staff'),
      fetch('/api/agency')
    ]);
    if (staffRes.ok) setStaff(await staffRes.json());
    if (agencyRes.ok) setAgency(await agencyRes.json());
  };

  return (
    <Layout>
      <HelpOverlay context="HR" />
      <div className="p-4 md:p-8 max-w-7xl mx-auto pt-20 md:pt-8">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="text-hitman-red" size={20} />
              <span className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">Office of the CHRO</span>
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
              Human <span className="text-hitman-red">Capital</span>
            </h1>
          </div>
          <div className="hidden md:flex gap-4">
             <button className="flex items-center gap-2 px-4 py-2 bg-hitman-gray border border-gray-800 rounded text-[10px] uppercase font-bold hover:border-hitman-red transition-colours">
                <Coffee size={14} /> Schedule 1:21
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-hitman-gray border border-gray-800 rounded text-[10px] uppercase font-bold hover:border-hitman-red transition-colours">
                <MessageSquare size={14} /> Agency Summit
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 flex items-center gap-2">
               Active Roster
               <span className="bg-hitman-gray px-2 py-0.5 rounded text-white text-[10px]">{staff.length}</span>
            </h2>

            {staff.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {staff.map(member => (
                  <StaffCard key={member.id} staff={member} onAction={refreshData} />
                ))}
              </div>
            ) : (
              <div className="bg-hitman-gray/30 border border-dashed border-gray-800 p-20 rounded-lg flex flex-col items-center justify-center text-center">
                 <UserPlus size={48} className="text-gray-800 mb-4" />
                 <h3 className="text-gray-500 font-bold uppercase text-xs">No Assets Employed</h3>
                 <p className="text-gray-600 text-[10px] mt-2">The current roster is empty. Please consult the CMO for recruitment.</p>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-hitman-gray border border-gray-800 rounded-lg p-6">
               <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4 border-b border-gray-800 pb-2">HR Bulletins</h3>
               <div className="space-y-4">
                  <div className="p-3 bg-black/20 rounded border-l-2 border-hitman-red">
                     <p className="text-[10px] text-white font-bold uppercase">Open Enrollment</p>
                     <p className="text-[9px] text-gray-500 mt-1">Life insurance policies for field agents are now being processed.</p>
                  </div>
                  <div className="p-3 bg-black/20 rounded border-l-2 border-gray-700">
                     <p className="text-[10px] text-white font-bold uppercase">Whistleblower Policy</p>
                     <p className="text-[9px] text-gray-500 mt-1">Reminder: Snitching is strictly prohibited by your NDA.</p>
                  </div>
               </div>
            </div>

            <div className="bg-hitman-gray border border-gray-800 rounded-lg p-6">
               <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4 border-b border-gray-800 pb-2">Engagement Metrics</h3>
               <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[9px] uppercase font-bold mb-1">
                       <span>Agency Morale</span>
                       <span className="text-green-500">100%</span>
                    </div>
                    <div className="w-full bg-black h-1 rounded-full overflow-hidden">
                       <div className="bg-green-500 h-full w-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[9px] uppercase font-bold mb-1">
                       <span>Retention Risk</span>
                       <span className="text-gray-500">LOW</span>
                    </div>
                    <div className="w-full bg-black h-1 rounded-full overflow-hidden">
                       <div className="bg-blue-500 h-full w-[10%]"></div>
                    </div>
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default HRPage;
