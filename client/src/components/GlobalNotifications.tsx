import React, { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { CheckCircle2, XCircle, Info, Bell, X } from 'lucide-react';
import '../styles/components.css';

const GlobalNotifications: React.FC = () => {
  const { notifications, removeNotification } = useGameStore();

  return (
    <div className="notification-container">
      {notifications.map((n) => (
        <NotificationItem key={n.id} notification={n} onClose={() => removeNotification(n.id)} />
      ))}
    </div>
  );
};

const NotificationItem: React.FC<{ notification: any; onClose: () => void }> = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (notification.type) {
      case 'SUCCESS': return <CheckCircle2 size={18} className="text-green-500" />;
      case 'FAILURE': return <XCircle size={18} className="text-hitman-red" />;
      case 'URGENT': return <Bell size={18} className="text-yellow-500 animate-bounce" />;
      default: return <Info size={18} className="text-blue-500" />;
    }
  };

  return (
    <div className="notification-item">
      <div className="flex gap-3">
        <div className="mt-0.5">{getIcon()}</div>
        <div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Secure Update</p>
          <p className="text-xs font-bold text-white leading-tight">{notification.message}</p>
        </div>
      </div>
      <button onClick={onClose} className="text-gray-600 hover:text-white">
        <X size={14} />
      </button>
    </div>
  );
};

export default GlobalNotifications;
