import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import axios from 'axios';


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/auth/me', {
          withCredentials: true, // Important for session-based auth!
        });
        setUser(res.data);
        console.log("Data dee", res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigate = useNavigate();

  return (
    <nav className="nav-bar relative">
      <h2 className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/Home')}>CodeShare</h2>
      <input
        className="search-input"
        type="text"
        placeholder="Search developers, skills, topics..."
      />
      <div className="nav-icons" ref={dropdownRef}>
        <button className="icon-btn">🏠</button>
        <button className="icon-btn">🔔</button>
        <button className="icon-btn">📩</button>

        <button className="profile-pic" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img
          src={user?.profilePicture || "https://via.placeholder.com/150"}
          alt="My Profile"
          className="profile-thumb small"
        />

        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-5 top-16 w-48 bg-white shadow-lg border rounded-md z-50">
            <div className="p-4 border-b">
              <p className="font-semibold text-sm">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <ul className="text-sm">
              <li>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              </li>
              <li>
                <a href="/editprofile" className="block px-4 py-2 hover:bg-gray-100">Edit Profile</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-red-500 hover:bg-gray-100">Log out</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
