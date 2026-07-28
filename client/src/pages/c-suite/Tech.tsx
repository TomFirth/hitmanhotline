import React from 'react';
import Layout from '../../components/Layout';
import { Cpu, Zap, Binary, Wrench } from 'lucide-react';

const TechPage: React.FC = () => {
  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-7xl mx-auto pt-20 md:pt-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="text-hitman-red" size={20} />
            <span className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">Office of the CTO</span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
            Systems & <span className="text-hitman-red">Hardware</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
           <section className="bg-hitman-gray border border-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <Zap size={16} className="text-yellow-500" />
                    Training Modules
                 </h2>
                 <span className="text-[10px] text-gray-500 font-mono">STATUS: STABLE</span>
              </div>

              <div className="space-y-4">
                 {[
                   { name: 'CQB Simulations', level: '01', color: 'bg-hitman-red' },
                   { name: 'Social Engineering', level: '01', color: 'bg-blue-500' },
                   { name: 'Penetration Testing', level: '01', color: 'bg-green-500' },
                 ].map(module => (
                   <div key={module.name} className="bg-black/20 p-4 rounded border border-gray-800 flex justify-between items-center group hover:border-gray-600 transition-colors">
                      <div>
                         <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Level {module.level}</p>
                         <p className="text-xs text-white font-bold uppercase">{module.name}</p>
                      </div>
                      <button className="text-[9px] bg-hitman-gray border border-gray-700 px-3 py-1 rounded text-white font-black hover:bg-hitman-red hover:border-hitman-red transition-all">
                         UPGRADE
                      </button>
                   </div>
                 ))}
              </div>
           </section>

           <section className="bg-hitman-gray border border-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <Wrench size={16} className="text-gray-400" />
                    Armory & Gear
                 </h2>
                 <span className="text-[10px] text-gray-500 font-mono">STOCK: LOW</span>
              </div>

              <div className="flex flex-col items-center justify-center h-64 text-center">
                 <Binary size={48} className="text-gray-800 mb-4" />
                 <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Awaiting Gear Shipment</p>
                 <p className="text-gray-600 text-[10px] mt-2 italic">Connect with CFO to review weapon sponsorships.</p>
              </div>
           </section>
        </div>

        <div className="bg-hitman-black/40 border border-gray-800 p-8 rounded-lg">
           <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="shrink-0 w-24 h-24 bg-hitman-gray rounded-full border border-gray-800 flex items-center justify-center relative">
                 <div className="absolute inset-0 rounded-full border-2 border-hitman-red border-t-transparent animate-spin"></div>
                 <Cpu size={32} className="text-hitman-red" />
              </div>
              <div>
                 <h3 className="text-white font-bold uppercase text-sm mb-2 italic tracking-widest">Mainframe Integration</h3>
                 <p className="text-gray-500 text-xs leading-relaxed max-w-2xl">
                    Our current computational power is dedicated to mission simulation and offline persistence management. As the agency scales, we will unlock deeper analytics and AI-driven target acquisition modules.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default TechPage;
