import React from 'react';
import '../styles/Home.css'; // uses same CSS for styling

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <h2 className="logo">CodeShare</h2>
      <input
        className="search-input"
        type="text"
        placeholder="Search developers, skills, topics..."
      />
      <div className="nav-icons">
        <button className="icon-btn">🏠</button>
        <button className="icon-btn">🔔</button>
        <button className="icon-btn">📩</button>
        <button className="profile-pic">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="My Profile"
            className="profile-thumb small"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
