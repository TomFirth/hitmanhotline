import React from 'react';
import Layout from '../../components/Layout';
import { useGameStore } from '../../store/useGameStore';
import { DollarSign, TrendingUp, PieChart, ReceiptText } from 'lucide-react';
import HelpOverlay from '../../components/HelpOverlay';

const FinancePage: React.FC = () => {
  const { agency, staff, transactions, setTransactions } = useGameStore();

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch('/api/transactions?userId=mock-user-id');
      if (res.ok) setTransactions(await res.json());
    };
    fetchTransactions();
  }, [setTransactions]);

  return (
    <Layout>
      <HelpOverlay context="FINANCE" />
      <div className="p-4 md:p-8 max-w-7xl mx-auto pt-20 md:pt-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="text-hitman-red" size={20} />
            <span className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">Office of the CFO</span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
            Financial <span className="text-hitman-red">Intelligence</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-hitman-gray border border-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Liquid Assets</h3>
            <p className="text-3xl font-mono text-green-500">${(agency?.balance || 0).toLocaleString()}</p>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-400">
              <TrendingUp size={12} className="text-green-500" />
              <span>+2.4% from last fiscal week</span>
            </div>
          </div>

          <div className="bg-hitman-gray border border-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-start mb-2">
               <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">Tax Efficiency</h3>
               <span className="text-[10px] text-green-500 font-mono">OPTIMAL</span>
            </div>
            <p className="text-3xl font-mono text-white">{agency?.entityType === 'Sole Trader' ? '20%' : '15%'}</p>
            <div className="mt-4 space-y-1">
               <div className="flex justify-between text-[8px] uppercase font-black text-gray-600">
                  <span>Sole Trader Bracket</span>
                  <span>{staff.length} / 5 STAFF</span>
               </div>
               <div className="w-full bg-black h-1 rounded-full overflow-hidden">
                  <div className="bg-hitman-red h-full" style={{ width: `${(staff.length / 5) * 100}%` }}></div>
               </div>
            </div>
          </div>

          <div className="bg-hitman-gray border border-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Projected Burn Rate</h3>
            <p className="text-3xl font-mono text-red-500">$0/day</p>
            <p className="mt-4 text-[10px] text-gray-400 uppercase">Runway: Infinite</p>
          </div>
        </div>

        <section className="bg-hitman-gray border border-gray-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-black/20">
            <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <ReceiptText size={16} className="text-hitman-red" />
              Recent Transactions
            </h2>
            <button className="text-[10px] text-gray-500 hover:text-white uppercase font-bold">Export CSV</button>
          </div>
          <div className="p-4">
             {transactions.length > 0 ? (
               <div className="space-y-2">
                  {transactions.map(t => (
                    <div key={t.id} className="flex justify-between items-center bg-black/20 p-3 rounded border border-gray-800">
                       <div>
                          <p className="text-xs text-white font-bold uppercase">{t.description}</p>
                          <p className="text-[9px] text-gray-600 uppercase font-mono">{new Date(t.createdAt).toLocaleString()}</p>
                       </div>
                       <span className={`font-mono text-sm ${t.type === 'INCOME' ? 'text-green-500' : 'text-red-500'}`}>
                          {t.type === 'INCOME' ? '+' : '-'}${t.amount.toLocaleString()}
                       </span>
                    </div>
                  ))}
               </div>
             ) : (
               <div className="p-8 text-center text-gray-600 italic text-sm">
                 No audit trails found for the current billing cycle.
               </div>
             )}
          </div>
        </section>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-hitman-gray/50 border border-dashed border-gray-800 p-8 rounded-lg flex flex-col items-center justify-center text-center">
              <PieChart size={40} className="text-gray-700 mb-4" />
              <h4 className="text-white font-bold uppercase text-xs mb-2">Weekly Revenue Review</h4>
              <p className="text-gray-500 text-[10px]">Financial reports are generated every Sunday at 00:00 ZULU.</p>
           </div>
           <div className="bg-hitman-gray/50 border border-dashed border-gray-800 p-8 rounded-lg flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                 <DollarSign size={20} className="text-gray-600" />
              </div>
              <h4 className="text-white font-bold uppercase text-xs mb-2">Payroll Management</h4>
              <p className="text-gray-500 text-[10px]">Automated direct deposit for all active field agents.</p>
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default FinancePage;
