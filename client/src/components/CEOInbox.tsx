import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { AdminTask } from '../types/game';
import { Mail, Trash2, Send, AlertCircle, Info, DollarSign, Users, ShieldAlert } from 'lucide-react';
import '../styles/components.css';

const CEOInbox: React.FC = () => {
  const { adminTasks, removeAdminTask, setAgency, setStaff } = useGameStore();
  const [selectedTask, setSelectedTask] = useState<AdminTask | null>(null);
  const [isResolving, setIsResolving] = useState(false);

  const handleResolve = async (taskId: string, optionIndex: number) => {
    setIsResolving(true);
    try {
      const res = await fetch('/api/tasks/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, optionIndex })
      });

      if (res.ok) {
        const result = await res.json();
        alert(result.flavourResponse);

        const agencyRes = await fetch('/api/agency');
        const staffRes = await fetch('/api/staff');
        if (agencyRes.ok) setAgency(await agencyRes.json());
        if (staffRes.ok) setStaff(await staffRes.json());

        removeAdminTask(taskId);
        setSelectedTask(null);
      }
    } catch (error) {
      console.error('Error resolving task:', error);
    } finally {
      setIsResolving(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'FINANCE': return <DollarSign size={14} className="text-green-500" />;
      case 'HR': return <Users size={14} className="text-blue-500" />;
      case 'LEGAL': return <ShieldAlert size={14} className="text-hitman-red" />;
      case 'MARKETING': return <Info size={14} className="text-purple-500" />;
      default: return <AlertCircle size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="inbox-container">
      <div className="card-header">
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-hitman-red" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">CEO Secure Inbox</h3>
        </div>
        <span className="text-[10px] text-gray-500 font-mono">{adminTasks.length} Messages</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="inbox-message-list">
          {adminTasks.length === 0 ? (
            <div className="p-8 text-center text-gray-600 italic text-[10px] uppercase">No pending directives.</div>
          ) : (
            adminTasks.map(task => (
              <button
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={`inbox-message-item ${
                  selectedTask?.id === task.id ? 'bg-hitman-red/10 border-l-2 border-l-hitman-red' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">{task.sender}</span>
                  {getCategoryIcon(task.category)}
                </div>
                <div className="text-[11px] font-bold text-white truncate">{task.subject}</div>
                <div className="text-[9px] text-gray-500 truncate mt-1">{task.content}</div>
              </button>
            ))
          )}
        </div>

        <div className="inbox-content">
          {selectedTask ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">{selectedTask.subject}</h2>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-widest">From: {selectedTask.sender}</p>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-600 hover:text-white transition-colours"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="bg-hitman-black/40 p-4 rounded border border-gray-800 mb-8">
                <p className="text-xs text-gray-300 leading-relaxed font-serif italic">"{selectedTask.content}"</p>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] text-hitman-red font-black uppercase tracking-[0.2em] mb-4">Required Action:</p>
                {selectedTask.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={isResolving}
                    onClick={() => handleResolve(selectedTask.id, idx)}
                    className="w-full group flex items-center justify-between p-3 bg-hitman-gray border border-gray-700 rounded hover:border-hitman-red hover:bg-hitman-red/5 transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] font-bold text-gray-500 group-hover:border-hitman-red group-hover:text-hitman-red">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-xs font-bold text-gray-400 group-hover:text-white uppercase tracking-wide">{option.label}</span>
                    </div>
                    <Send size={12} className="text-gray-700 group-hover:text-hitman-red opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
              <Mail size={48} className="mb-4" />
              <p className="text-xs font-black uppercase tracking-widest">Select a secure transmission</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CEOInbox;
