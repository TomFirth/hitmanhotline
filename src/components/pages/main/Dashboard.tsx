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
      {/* Sidebar Menu */}
      <aside className="dashboard-sidebar">
        <h2>Menu</h2>
        <ul>
          <li>Training & Skill Development</li>
          <li>Human Resources & Recruitment</li>
          <li>Field Operations & Missions</li>
          <li>Intelligence Gathering & Analysis</li>
          <li>Covert Communications</li>
          <li>Logistics & Support</li>
          <li>Psychological Operations</li>
          <li>Technology & Cyber Espionage</li>
          <li>Diplomatic and Economic Espionage</li>
          <li>Deception & Misdirection</li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Statistics Section */}
        <section className="dashboard-stats">
          <h3>Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">Missions Completed: 20</div>
            <div className="stat-card">Active Agents: 35</div>
            <div className="stat-card">Successful Infiltrations: 12</div>
            <div className="stat-card">Critical Threats Neutralized: 5</div>
          </div>
        </section>

        {/* News Feed */}
        <section className="dashboard-news">
          <h3>News Feed</h3>
          <div className="news-feed">
            <div className="news-item">Breaking: Global espionage tensions rise...</div>
            <div className="news-item">New cyber threat detected targeting...</div>
            <div className="news-item">Top agent awarded for outstanding...</div>
          </div>
        </section>

        {/* World Map */}
        <section className="dashboard-map">
          <h3>World Map</h3>
          <img src="/path-to-your-world-map-image.jpg" alt="World Map" className="world-map" />
        </section>

        {/* Red Phone */}
        <section className="dashboard-red-phone">
          <h3>Red Phone</h3>
          <div className="red-phone-desk">
            <img src="/path-to-red-phone-image.jpg" alt="Red Phone" className="red-phone" />
          </div>
        </section>

        {/* Additional Features */}
        <section className="dashboard-features">
          <h3>Additional Features</h3>
          <div className="features-grid">
            <div className="feature-card">Agent Network</div>
            <div className="feature-card">Mission Planner</div>
            <div className="feature-card">Encryption Tools</div>
            <div className="feature-card">Covert Operations Logs</div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
