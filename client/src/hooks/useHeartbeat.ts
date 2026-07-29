import { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';

export const useHeartbeat = () => {
  const { isOnline } = useGameStore();

  useEffect(() => {
    if (!isOnline) return;

    const sendHeartbeat = async () => {
      try {
        await fetch('/api/user/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 'mock-user-id' }) 
        });
      } catch (error) {
        console.error('Heartbeat failure:', error);
      }
    };

    
    sendHeartbeat();

    
    const interval = setInterval(sendHeartbeat, 60000);

    return () => clearInterval(interval);
  }, [isOnline]);
};
