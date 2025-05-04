import React from 'react';

const TabSwitcher = ({ activeTab, setActiveTab, page = '' }) => {
  return (
    <div className="tab-switcher">
      {page === 'auth' && (
        <>
          <button
            className={activeTab === 'login' ? 'active' : ''}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={activeTab === 'signup' ? 'active' : ''}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </>
      )}

      {page === 'home' && (
        <>
          <button
            className={activeTab === 'feed' ? 'active' : ''}
            onClick={() => setActiveTab('feed')}
          >
            Skills
          </button>
          <button
            className={activeTab === 'progress' ? 'active' : ''}
            onClick={() => setActiveTab('progress')}
          >
            Progress
          </button>
          <button
            className={activeTab === 'plans' ? 'active' : ''}
            onClick={() => setActiveTab('plans')}
          >
            Plans
          </button>
        </>
      )}
    </div>
  );
};

export default TabSwitcher;
