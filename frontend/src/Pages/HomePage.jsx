import React, { useState } from 'react';
import '../styles/Home.css';
import TabSwitcher from '../Components/TabSwitcher';
import FeedTab from '../Components/FeedTab';
import ProgressTab from '../Components/ProgressTab';
import PlansTab from '../Components/PlansTab';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="home-wrapper">
      <nav className="nav-bar">
        <h2 className="logo">CodeShare</h2>
        <input className="search-input" type="text" placeholder="Search developers, skills, topics..." />
        <div className="nav-icons">
          <button className="icon-btn">🏠</button>
          <button className="icon-btn">🔔</button>
          <button className="icon-btn">📩</button>
          <button className="profile-pic">
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="My Profile" className="profile-thumb small" />
          </button>
        </div>
      </nav>

      <div className="main-content">
        <div className="left-section">
          <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} page="home" />
          {activeTab === 'feed' && <FeedTab />}
          {activeTab === 'progress' && <ProgressTab />}
          {activeTab === 'plans' && <PlansTab />}
        </div>

        <div className="right-section">
          <h4>Suggested for you</h4>
          <ul className="suggested-list">
            <li>
              <div className="suggested-item">
                <img src="https://randomuser.me/api/portraits/women/20.jpg" alt="Emma Thompson" className="profile-thumb small" />
                <div>
                  <p>Emma Thompson</p>
                  <small>5 mutual connections</small>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
            </li>
            <li>
              <div className="suggested-item">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael Chen" className="profile-thumb small" />
                <div>
                  <p>Michael Chen</p>
                  <small>3 mutual connections</small>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
            </li>
            <li>
              <div className="suggested-item">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sophie Anderson" className="profile-thumb small" />
                <div>
                  <p>Sophie Anderson</p>
                  <small>8 mutual connections</small>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;