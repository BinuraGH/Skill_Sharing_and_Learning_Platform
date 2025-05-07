// src/Components/HomeLeftSection.jsx
import React from 'react';
import TabSwitcher from './TabSwitcher';
import FeedTab from './FeedTab';
import ProgressTab from './ProgressTab';
import PlansTab from './PlansTab';

const HomeLeftSection = ({ activeTab, setActiveTab }) => {
  return (
    <div className="left-section">
      <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} page="home" />
      {activeTab === 'feed' && <FeedTab />}
      {activeTab === 'progress' && <ProgressTab />}
      {activeTab === 'plans' && <PlansTab />}
    </div>
  );
};

export default HomeLeftSection;
