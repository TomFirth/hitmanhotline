import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 2000); 
  }, [navigate]);

  return (
    <div className="splash-container">
      <h1>Welcome to My App</h1>
      <p>Loading...</p>
    </div>
  );
};

export default SplashScreen;
