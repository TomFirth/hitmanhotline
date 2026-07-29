import React, { useState } from 'react';
import { HelpCircle, X, Info, Target, Users, DollarSign, Shield } from 'lucide-react';
import '../styles/components.css';

interface HelpTip {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface HelpOverlayProps {
  context: 'DASHBOARD' | 'RECRUITMENT' | 'OPERATIONS' | 'FINANCE' | 'HR' | 'ACCOUNT' | 'TECH';
}

const HELP_CONTENT: Record<string, HelpTip[]> = {
  DASHBOARD: [
    { title: 'Global Overview', description: 'Monitor your agency\'s wealth, reputation, and active personnel in real-time.', icon: <Info size={16} /> },
    { title: 'The Red Phone', description: 'Pulses when urgent CEO directives are available. Handle them for instant rewards.', icon: <Target size={16} /> },
    { title: 'News Feed', description: 'Stay informed on global events that might create high-risk contract opportunities.', icon: <Info size={16} /> }
  ],
  RECRUITMENT: [
    { title: 'Scouting Talent', description: 'Field Agents (Hitmen) execute missions, while Support Staff provide operational bonuses.', icon: <Users size={16} /> },
    { title: 'Elite Prospects', description: 'Look for 16-year-olds; they have the highest long-term potential but need time to mature.', icon: <Target size={16} /> },
    { title: 'Dynamic Market', description: 'If you can\'t find the right fit, use filters to trigger our scouts to find fresh talent.', icon: <Info size={16} /> }
  ],
  OPERATIONS: [
    { title: 'Authorising Contracts', description: 'Assign idle assets to contracts. Higher difficulty requires better skill specialisation.', icon: <Shield size={16} /> },
    { title: 'Real-time Resolution', description: 'Missions run in real-time. Watch the progress bars to track infiltration and extraction.', icon: <Info size={16} /> },
    { title: 'Critical Risk', description: 'High-risk missions can lead to assets being captured. Always check the success rate.', icon: <Target size={16} /> }
  ],
  FINANCE: [
    { title: 'Liquid Assets', description: 'Your available cash. Used for hiring, facilities, and paying weekly salaries.', icon: <DollarSign size={16} /> },
    { title: 'Sponsorships', description: 'Weekly deals that provide steady income or equipment like Rifles and SMGs.', icon: <Info size={16} /> },
    { title: 'Burn Rate', description: 'Monitor your weekly liabilities. Failing to pay salaries will lead to asset defection.', icon: <Target size={16} /> }
  ],
  HR: [
    { title: 'Staff Roster', description: 'Manage your entire workforce. Track their experience, quirks, and unique histories.', icon: <Users size={16} /> },
    { title: 'Seniority & Salary', description: 'Assets are promoted as they gain XP. Higher seniority leads to better performance but higher pay.', icon: <DollarSign size={16} /> },
    { title: 'Performance Degradation', description: 'Field agents peak at 25 and begin to lose effectiveness after 30. Plan their retirement.', icon: <Target size={16} /> }
  ],
  ACCOUNT: [
    { title: 'Director Profile', description: 'Securely update your executive credentials and agency branding.', icon: <Shield size={16} /> },
    { title: 'Official Filings', description: 'Review your registration data and tax bracket. Rebranding may incur prestige costs.', icon: <Info size={16} /> },
    { title: 'Mainframe Mode', description: 'Toggle low-power modes for better performance on older hardware.', icon: <Info size={16} /> }
  ],
  TECH: [
    { title: 'Training Modules', description: 'Invest in your staff to improve their core skills like Marksmanship or Hacking.', icon: <Target size={16} /> },
    { title: 'Gear & Gadgets', description: 'Equip your operatives with silenced weapons and surveillance tech to boost success.', icon: <Info size={16} /> },
    { title: 'R&D Research', description: 'Unlock new continental mission sectors and advanced tactical doctrines.', icon: <Shield size={16} /> }
  ]
};

const HelpOverlay: React.FC<HelpOverlayProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tips = HELP_CONTENT[context] || [];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-[60] w-8 h-8 rounded-full bg-hitman-gray border border-gray-800 flex items-center justify-center text-gray-500 hover:text-white hover:border-hitman-red transition-all shadow-lg"
        title="Page Help"
      >
        <HelpCircle size={18} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

          <div className="relative w-full max-w-md bg-hitman-gray border border-gray-800 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-black/20">
              <div className="flex items-center gap-2">
                <HelpCircle size={16} className="text-hitman-red" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-white">Shadow Network Briefing</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Context: {context}</p>

              <div className="space-y-4">
                {tips.map((tip, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 w-8 h-8 rounded bg-black/40 border border-gray-800 flex items-center justify-center text-hitman-red shrink-0">
                      {tip.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide mb-1">{tip.title}</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-black/40 border-t border-gray-800 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2 bg-hitman-red text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-colours"
              >
                Acknowledged
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpOverlay;
