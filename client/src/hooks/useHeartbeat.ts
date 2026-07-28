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
          body: JSON.stringify({ userId: 'mock-user-id' }) // Mock until full auth
        });
      } catch (error) {
        console.error('Heartbeat failure:', error);
      }
    };

    // Initial heartbeat
    sendHeartbeat();

    // Send heartbeat every 60 seconds
    const interval = setInterval(sendHeartbeat, 60000);

    return () => clearInterval(interval);
  }, [isOnline]);
};
