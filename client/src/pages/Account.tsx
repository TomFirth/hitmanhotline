import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useGameStore } from '../store/useGameStore';
import { Shield, Save, User, Mail, Lock, Building, FileText, MapPin } from 'lucide-react';
import HelpOverlay from '../components/HelpOverlay';

const AccountPage: React.FC = () => {
  const { agency, setAgency } = useGameStore();
  const [profile, setProfile] = useState({
    username: agency.username,
    email: agency.email,
    password: '',
  });

  const [company, setCompany] = useState({
    agencyName: agency.agencyName,
    entityType: agency.entityType,
    registeredAddress: agency.registeredAddress,
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: agency.id, ...profile })
      });
      if (res.ok) {
        const updated = await res.json();
        setAgency(updated);
        alert("Director profile updated securely.");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleAgencyUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/update-agency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: agency.id, ...company })
      });
      if (res.ok) {
        const updated = await res.json();
        setAgency(updated);
        alert("Official corporate filings updated.");
      }
    } catch (error) {
      console.error('Error updating agency:', error);
    }
  };

  return (
    <Layout>
      <HelpOverlay context="ACCOUNT" />
      <div className="p-4 md:p-8 max-w-4xl mx-auto pt-20 md:pt-8 pb-32">
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-1 text-hitman-red">
            <Shield size={20} />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase">Director's Access Only</span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
            Account <span className="text-hitman-red">Hub</span>
          </h1>
          <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">Manage credentials and official corporate filings.</p>
        </header>

        <div className="space-y-12">
          <section className="bg-hitman-gray border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800 bg-black/20 flex items-center gap-2">
              <User size={16} className="text-blue-500" />
              <h2 className="text-sm font-bold uppercase tracking-widest">Director Profile</h2>
            </div>
            <form onSubmit={handleProfileUpdate} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 text-gray-600" size={14} />
                    <input
                      type="text"
                      value={profile.username}
                      onChange={(e) => setProfile({...profile, username: e.target.value})}
                      className="w-full bg-black border border-gray-800 rounded px-10 py-2 text-sm text-white focus:border-hitman-red outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Secure Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 text-gray-600" size={14} />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="w-full bg-black border border-gray-800 rounded px-10 py-2 text-sm text-white focus:border-hitman-red outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Update Encryption Key (Password)</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 text-gray-600" size={14} />
                  <input
                    type="password"
                    placeholder="Enter new password to change..."
                    value={profile.password}
                    onChange={(e) => setProfile({...profile, password: e.target.value})}
                    className="w-full bg-black border border-gray-800 rounded px-10 py-2 text-sm text-white focus:border-hitman-red outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded text-xs font-black uppercase tracking-widest transition-colors"
                >
                  <Save size={14} />
                  Save Profile
                </button>
              </div>
            </form>
          </section>

          <section className="bg-hitman-gray border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800 bg-black/20 flex items-center gap-2">
              <Building size={16} className="text-hitman-red" />
              <h2 className="text-sm font-bold uppercase tracking-widest">Official Agency Filing</h2>
            </div>
            <form onSubmit={handleAgencyUpdate} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50 select-none">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Reg Number</label>
                  <div className="bg-black border border-gray-800 rounded px-3 py-2 text-sm text-gray-400 font-mono">
                    {agency.registrationNumber}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Inc Date</label>
                  <div className="bg-black border border-gray-800 rounded px-3 py-2 text-sm text-gray-400 font-mono">
                    {new Date(agency.incorporationDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Tax Bracket</label>
                  <div className="bg-black border border-gray-800 rounded px-3 py-2 text-sm text-green-900 font-mono">
                    STARTUP (0%)
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-800/50">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Agency Trading Name</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-2.5 text-gray-600" size={14} />
                    <input
                      type="text"
                      value={company.agencyName}
                      onChange={(e) => setCompany({...company, agencyName: e.target.value})}
                      className="w-full bg-black border border-gray-800 rounded px-10 py-2 text-sm text-white focus:border-hitman-red outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Entity Legal Structure</label>
                    <select
                      value={company.entityType}
                      onChange={(e) => setCompany({...company, entityType: e.target.value})}
                      className="w-full bg-black border border-gray-800 rounded px-3 py-2 text-sm text-white focus:border-hitman-red outline-none transition-colors"
                    >
                      <option>Sole Trader</option>
                      <option>Private Limited Company (Ltd)</option>
                      <option>Public Limited Company (PLC)</option>
                      <option>Non-Profit Foundation (Front)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Registered HQ Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 text-gray-600" size={14} />
                      <input
                        type="text"
                        value={company.registeredAddress}
                        onChange={(e) => setCompany({...company, registeredAddress: e.target.value})}
                        className="w-full bg-black border border-gray-800 rounded px-10 py-2 text-sm text-white focus:border-hitman-red outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <p className="text-[9px] text-gray-600 italic">* Rebranding may incur a administrative fee of 100 Prestige.</p>
                <button
                  className="flex items-center gap-2 bg-hitman-red hover:bg-red-700 text-white px-6 py-2 rounded text-xs font-black uppercase tracking-widest transition-colors"
                >
                  <Save size={14} />
                  File Changes
                </button>
              </div>
            </form>
          </section>

          <section className="bg-hitman-black/40 border border-dashed border-gray-800 p-8 rounded-lg">
             <h3 className="text-white font-bold uppercase text-sm mb-6 italic tracking-widest">Agency OS Settings</h3>
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                   <div>
                      <p className="text-xs text-gray-300 font-bold uppercase">Real-time Notifications</p>
                      <p className="text-[10px] text-gray-500">Enable "Secure Update" toasts for mission results.</p>
                   </div>
                   <div className="w-10 h-5 bg-hitman-red rounded-full relative">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                   </div>
                </div>
                <div className="flex justify-between items-center">
                   <div>
                      <p className="text-xs text-gray-300 font-bold uppercase">Low-Power Mainframe Mode</p>
                      <p className="text-[10px] text-gray-500">Reduce animation complexity for low-end devices.</p>
                   </div>
                   <div className="w-10 h-5 bg-gray-800 rounded-full relative">
                      <div className="absolute left-1 top-1 w-3 h-3 bg-gray-500 rounded-full"></div>
                   </div>
                </div>
                <div className="pt-6 border-t border-gray-800">
                   <button className="text-xs text-hitman-red hover:underline font-black uppercase tracking-tighter">
                      Dissolve Agency Entity (Reset Account)
                   </button>
                </div>
             </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
