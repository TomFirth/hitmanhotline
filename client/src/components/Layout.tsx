import React from 'react';
import Navigation from './Navigation';
import GlobalNotifications from './GlobalNotifications';
import '../styles/layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header group">
          <h2 className="brand-logo group-hover:tracking-normal">
            HITMAN<span className="brand-accent">HOTLINE</span>
          </h2>
          <div className="os-status">
            <span className="os-pulse"></span>
            <p className="os-version">Agency OS v1.0.4</p>
          </div>
        </div>

        <Navigation />

        <div className="director-profile">
          <div className="director-avatar">
            CEO
          </div>
          <div className="director-info">
            <span className="director-name">Director Tom</span>
            <span className="director-title">Global Shadow Head</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <GlobalNotifications />
        {children}
      </main>

      <div className="mobile-header">
        <h2 className="brand-logo">
          HITMAN<span className="brand-accent">HOTLINE</span>
        </h2>
        <div className="director-avatar text-[10px]">
          CEO
        </div>
      </div>

      <div className="mobile-nav-container">
        <div className="max-h-[60vh] overflow-y-auto p-4">
           <Navigation />
        </div>
      </div>
    </div>
  );
};

export default Layout;
