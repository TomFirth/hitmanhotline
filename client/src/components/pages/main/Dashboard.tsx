import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import './styles/styles.css';

const Dashboard: React.FC = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!user.emailVerified) {
    return (
      <div>
        <h1>Email not verified</h1>
        <p>Please check your inbox and verify your email to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {}
      <footer className="dashboard-footer">
        <ul>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="https://facebook.com">Facebook</a></li>
          <li><a href="https://twitter.com">Twitter</a></li>
          <li><a href="https://instagram.com">Instagram</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default Dashboard;
