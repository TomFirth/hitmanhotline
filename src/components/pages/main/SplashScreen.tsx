import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 2000); // 2 seconds delay
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50vh' }}>
      <h1>Welcome to My App</h1>
      <p>Loading...</p>
    </div>
  );
};

export default SplashScreen;
