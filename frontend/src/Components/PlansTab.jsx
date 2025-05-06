import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlansTab = () => {
  const navigate = useNavigate();

  return (
    <div className="tab-content">
      {/* Header section */}
      <div className="plans-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Your Learning Plans</h3>
        <button onClick={() => navigate('/plans')} className="manage-btn">
          Manage Plans
        </button>
      </div>

    </div>
  );
};

export default PlansTab;
