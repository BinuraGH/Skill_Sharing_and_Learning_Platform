import React, { useState } from 'react';
import '../styles/Home.css';
import Navbar from '../Components/Navbar';
import HomeLeftSection from '../Components/HomeLeftSection';
import HomeRightSection from '../Components/HomeRightSection';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="home-wrapper">
      <Navbar />
      <div className="main-content">
        <HomeLeftSection activeTab={activeTab} setActiveTab={setActiveTab} />
        <HomeRightSection />
      </div>
    </div>
  );
};

export default HomePage;
