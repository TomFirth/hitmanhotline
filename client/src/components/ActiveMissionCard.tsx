import React, { useState, useEffect } from 'react';
import { ActiveMission, Mission, Staff } from '../types/game';
import { Clock, Target } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import '../styles/components.css';

interface ActiveMissionCardProps {
  activeMission: ActiveMission;
  mission: Mission;
  staff: Staff[];
  onComplete: (result: any) => void;
}

const ActiveMissionCard: React.FC<ActiveMissionCardProps> = ({ activeMission, mission, staff, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [phase, setPhase] = useState('INFILTRATION');
  const { addNotification, resolveActiveMission } = useGameStore();
  const isResolving = React.useRef(false);
  const hasNotified = React.useRef(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const end = new Date(activeMission.endTime).getTime();
      const start = new Date(activeMission.startTime).getTime();
      const total = end - start;
      const remaining = Math.max(0, end - now);

      setTimeLeft(Math.floor(remaining / 1000));

      const progress = 1 - (remaining / total);
      if (progress < 0.3) setPhase('INFILTRATION');
      else if (progress < 0.8) setPhase('OBJECTIVE');
      else setPhase('EXTRACTION');

      if (remaining === 0 && !isResolving.current && !hasNotified.current) {
        isResolving.current = true;
        const checkStatus = async () => {
          try {
            const res = await fetch(`/api/missions/status/${activeMission.id}`);
            if (!res.ok) throw new Error('Status check failed');
            const data = await res.json();

            if (data.status !== 'IN_PROGRESS' && !hasNotified.current) {
              hasNotified.current = true;
              addNotification(
                data.status === 'SUCCESS' ? 'SUCCESS' : 'FAILURE',
                `Operation ${mission.name}: ${data.status} (+$${data.rewards?.cash || 0})`
              );
              resolveActiveMission(data);
              onComplete(data);
            } else if (data.status === 'IN_PROGRESS') {
              isResolving.current = false;
              setTimeout(checkStatus, 2000);
            }
          } catch (error) {
            isResolving.current = false;
            setTimeout(checkStatus, 5000);
          }
        };
        checkStatus();
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [activeMission, mission.name, addNotification, resolveActiveMission, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = 1 - (timeLeft / mission.durationSeconds);

  return (
    <div className="card card-hover">
      <div className="card-header">
        <div className="flex items-center gap-2">
          <Target size={16} className="text-hitman-red" />
          <span className="text-xs font-bold uppercase tracking-widest">{mission.name}</span>
        </div>
        <div className="flex items-center gap-2 text-hitman-red font-mono text-sm">
          <Clock size={14} />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="card-content">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-tighter">Current Phase</p>
            <p className="text-sm text-white font-bold italic tracking-tighter">{phase}</p>
          </div>
          <div className="text-right">
             <p className="text-[10px] text-gray-500 uppercase font-black tracking-tighter">Assigned Assets</p>
             <div className="flex -space-x-2 mt-1">
                {staff.map(s => (
                  <div key={s.id} className="w-6 h-6 rounded-full bg-hitman-black border border-gray-700 flex items-center justify-center text-[8px] font-bold text-gray-400" title={s.name}>
                    {s.name.substring(0, 2)}
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="mt-4 flex justify-between items-center text-[9px] text-gray-500 uppercase font-bold tracking-widest">
           <span>Success Rate Optimising...</span>
           <span>Risk: {mission.riskLevel > 2 ? 'HIGH' : 'LOW'}</span>
        </div>
      </div>
    </div>
  );
};

export default ActiveMissionCard;
