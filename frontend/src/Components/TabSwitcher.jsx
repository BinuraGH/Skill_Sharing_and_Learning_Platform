import React from 'react';

const TabSwitcher = ({ activeTab, setActiveTab }) => (
  <div className="tab-switcher">
    <button className={activeTab === 'feed' ? 'active' : ''} onClick={() => setActiveTab('feed')}>Skills</button>
    <button className={activeTab === 'progress' ? 'active' : ''} onClick={() => setActiveTab('progress')}>Progress</button>
    <button className={activeTab === 'plans' ? 'active' : ''} onClick={() => setActiveTab('plans')}>Plans</button>
  </div>
);

export default TabSwitcher;
