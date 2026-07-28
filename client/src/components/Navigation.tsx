import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Users,
  Briefcase,
  DollarSign,
  Cpu,
  ShieldCheck,
  Megaphone
} from 'lucide-react';
import '../styles/layout.css';

interface NavItem {
  name: string;
  path: string;
  offline: boolean;
}

interface NavSection {
  role: string;
  title: string;
  icon: React.ReactNode;
  items: NavItem[];
}

const Navigation: React.FC = () => {
  const location = useLocation();
  const { isOnline } = useGameStore();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'CEO': true
  });

  const sections: NavSection[] = [
    {
      role: 'CEO',
      title: 'Executive Suite',
      icon: <LayoutDashboard size={18} />,
      items: [
        { name: 'Dashboard', path: '/dashboard', offline: true },
        { name: 'Account Hub', path: '/ceo/account', offline: true },
        { name: 'News Feed', path: '/ceo/news', offline: true },
        { name: 'Agency Overview', path: '/ceo/overview', offline: true },
        { name: 'The Red Phone', path: '/ceo/hotline', offline: true },
      ]
    },
    {
      role: 'CHRO',
      title: 'Human Capital',
      icon: <Users size={18} />,
      items: [
        { name: 'Staff Roster', path: '/staff', offline: true },
        { name: '1:21 Meetings', path: '/chro/meetings', offline: true },
        { name: 'Agency Summit', path: '/chro/summit', offline: true },
      ]
    },
    {
      role: 'COO',
      title: 'Operations',
      icon: <Briefcase size={18} />,
      items: [
        { name: 'Active Missions', path: '/missions', offline: true },
        { name: 'World Map', path: '/coo/map', offline: true },
        { name: 'Ops Statistics', path: '/coo/stats', offline: true },
      ]
    },
    {
      role: 'CFO',
      title: 'Finances',
      icon: <DollarSign size={18} />,
      items: [
        { name: 'Sponsorships', path: '/cfo/sponsors', offline: true },
        { name: 'Weekly Review', path: '/cfo/review', offline: true },
        { name: 'Payroll', path: '/cfo/payroll', offline: true },
      ]
    },
    {
      role: 'CTO',
      title: 'R & D',
      icon: <Cpu size={18} />,
      items: [
        { name: 'Training Modules', path: '/cto/training', offline: true },
        { name: 'Gear & Gadgets', path: '/cto/gear', offline: true },
      ]
    },
    {
      role: 'CMO',
      title: 'Market & PR',
      icon: <Megaphone size={18} />,
      items: [
        { name: 'Recruitment', path: '/market', offline: true },
        { name: 'Brand Intelligence', path: '/cmo/market', offline: false },
      ]
    },
    {
      role: 'CLO',
      title: 'Legal & Heat',
      icon: <ShieldCheck size={18} />,
      items: [
        { name: 'Captivity Desk', path: '/clo/legal', offline: true },
        { name: 'Heat Management', path: '/clo/heat', offline: true },
      ]
    }
  ];

  const toggleSection = (role: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [role]: !prev[role]
    }));
  };

  return (
    <nav className="nav-list">
      {sections.map((section) => (
        <div key={section.role} className="flex flex-col">
          <button
            onClick={() => toggleSection(section.role)}
            className="nav-section-button"
          >
            <div className="flex items-center gap-3">
              <span className="nav-section-icon">
                {section.icon}
              </span>
              <div className="nav-section-info">
                <span className="nav-role">{section.role}</span>
                <span className="nav-title">{section.title}</span>
              </div>
            </div>
            {expandedSections[section.role] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {expandedSections[section.role] && (
            <div className="nav-sub-list">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                const isDisabled = !item.offline && !isOnline;

                return (
                  <Link
                    key={item.path}
                    to={isDisabled ? '#' : item.path}
                    className={`nav-item ${
                      isActive
                        ? 'nav-item-active'
                        : 'nav-item-inactive'
                    } ${isDisabled ? 'nav-item-disabled' : ''}`}
                  >
                    {item.name}
                    {isDisabled && <span className="ml-2 text-[8px] italic">[OFFLINE]</span>}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
