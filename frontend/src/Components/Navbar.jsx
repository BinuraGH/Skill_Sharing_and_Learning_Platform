import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiSearch, FiHome, FiBookOpen, FiBell, FiMessageSquare } from 'react-icons/fi';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/auth/me', {
          withCredentials: true,
        });
        setUser(res.data);
        console.log("Logged in user:", res.data); // ✅ Debug log
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const imageSrc =
  user?.profilePicture && user.profilePicture.trim() !== ''
    ? user.profilePicture
    : '/default-avatar.png';

  return (
    <nav className="w-full bg-white border-b px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/Home')}>
        <FiBookOpen className="text-purple-600 text-2xl hover:scale-110 transition-transform duration-150" />
        <span className="text-xl font-semibold text-purple-600">CodeShare</span>
      </div>

      {/* Search Bar */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search developers, skills, topics..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition-shadow hover:shadow-sm"
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-500 text-lg" />
      </div>

      {/* Icons & Profile */}
      <div className="flex items-center gap-5" ref={dropdownRef}>
        {[{ icon: FiHome, path: '/Home' }, { icon: FiBell }, { icon: FiMessageSquare }].map(
          ({ icon: Icon, path }, idx) => (
            <div
              key={idx}
              onClick={() => path && navigate(path)}
              className="relative group p-2 rounded-md cursor-pointer transition duration-200 hover:bg-purple-100 hover:shadow-md"
            >
              <div className="absolute inset-0 border-2 border-purple-500 opacity-0 group-hover:opacity-100 rounded-md scale-95 group-hover:scale-100 transition-all duration-200 pointer-events-none"></div>
              <Icon className="text-xl text-gray-600 group-hover:text-purple-600 relative z-10 transition duration-200" />
            </div>
          )
        )}

        {/* Profile Image */}
        <div className="relative">
          <img
            src={imageSrc}
            alt="Profile"
            className="w-9 h-9 rounded-full border cursor-pointer transition duration-200 hover:ring-2 hover:ring-purple-400"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-56 bg-white border rounded-md shadow-md z-50 animate-fade-slide">
              <div className="p-4 border-b text-sm">
                <p className="font-medium">{user?.name}</p>
                <p className="text-gray-500">{user?.email}</p>
              </div>
              <ul className="text-sm">
                <li>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/editprofile" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition duration-150">
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
