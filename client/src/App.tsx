// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RecruitmentPage from './pages/Recruitment';
import FinancePage from './pages/c-suite/Finance';
import OperationsPage from './pages/c-suite/Operations';
import HRPage from './pages/c-suite/HR';
import TechPage from './pages/c-suite/Tech';
import AccountPage from './pages/Account';
import { useHeartbeat } from './hooks/useHeartbeat';

// Placeholder for missing sub-pages
const GenericPlaceholder = ({ title, role }: { title: string, role: string }) => (
  <Layout>
    <div className="p-4 md:p-8 max-w-7xl mx-auto pt-20 md:pt-8 text-center py-40">
      <div className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase mb-2">Office of the {role}</div>
      <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic mb-4">{title}</h1>
      <p className="text-gray-500 text-xs uppercase tracking-widest">Protocol strictly classified. Access denied.</p>
    </div>
  </Layout>
);

const App: React.FC = () => {
  useHeartbeat();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />

        {/* CHRO Routes */}
        <Route path="/staff" element={<HRPage />} />
        <Route path="/chro/meetings" element={<GenericPlaceholder title="1:21 Meetings" role="CHRO" />} />
        <Route path="/chro/summit" element={<GenericPlaceholder title="Agency Summit" role="CHRO" />} />

        {/* COO Routes */}
        <Route path="/missions" element={<OperationsPage />} />
        <Route path="/coo/map" element={<OperationsPage />} />
        <Route path="/coo/stats" element={<OperationsPage />} />

        {/* CFO Routes */}
        <Route path="/cfo/sponsors" element={<FinancePage />} />
        <Route path="/cfo/review" element={<FinancePage />} />
        <Route path="/cfo/payroll" element={<FinancePage />} />

        {/* CTO Routes */}
        <Route path="/cto/training" element={<TechPage />} />
        <Route path="/cto/gear" element={<TechPage />} />

        {/* CMO Routes */}
        <Route path="/market" element={<RecruitmentPage />} />
        <Route path="/cmo/market" element={<RecruitmentPage />} />

        {/* CLO Routes */}
        <Route path="/clo/legal" element={<GenericPlaceholder title="Captivity Desk" role="CLO" />} />
        <Route path="/clo/heat" element={<GenericPlaceholder title="Heat Management" role="CLO" />} />

        {/* CEO Routes */}
        <Route path="/ceo/news" element={<GenericPlaceholder title="News Feed" role="CEO" />} />
        <Route path="/ceo/overview" element={<GenericPlaceholder title="Agency Overview" role="CEO" />} />
        <Route path="/ceo/hotline" element={<GenericPlaceholder title="The Red Phone" role="CEO" />} />
        <Route path="/ceo/account" element={<AccountPage />} />
      </Routes>
    </Router>
  );
};

export default App;
