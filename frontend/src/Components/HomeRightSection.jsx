// src/Components/HomeRightSection.jsx
import React from 'react';

const HomeRightSection = () => {
  return (
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
  );
};

export default HomeRightSection;
