import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import '../styles/ManagePlans.css';

const PlanCard = ({ plan, onDelete, onEdit }) => {  // ✅ Receive onEdit

  const handleDeleteClick = () => {
    if (plan._id && plan.userId) {
      onDelete(plan._id, plan.userId);
    } else {
      console.error('Plan ID or User ID missing for delete!');
    }
  };

  const handleEditClick = () => {   // ✅ New: handle edit click
    if (plan) {
      onEdit(plan);  // 🔥 send full plan to parent ManagePlans.jsx
    }
  };

  return (
    <div className="plan-card">
      <div className="card-header">
        <div>
          <h3>{plan.title}</h3>
          <p style={{ color: '#6b7280' }}>{plan.description || plan.subtitle}</p>

          {parseFloat(plan.price) > 0 ? (
            <p style={{ color: '#4b5563', fontWeight: 'bold', marginTop: '4px' }}>
              ${parseFloat(plan.price).toFixed(2)}
            </p>
          ) : (
            <p style={{ color: '#10b981', fontWeight: 'bold', marginTop: '4px' }}>
              Free
            </p>
          )}
        </div>

        <div className="card-actions">
          <button className="icon-btn" onClick={handleEditClick}>
            <FiEdit2 />
          </button>
          <button className="icon-btn delete" onClick={handleDeleteClick}>
            <FiTrash2 />
          </button>
        </div>
      </div>

      {/* Topics */}
      {plan.topics && Array.isArray(plan.topics) && (
        <ul style={{ marginTop: '12px' }}>
          {plan.topics.map((topic, index) => (
            <li key={index}>
              {typeof topic === 'string' ? topic : topic.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlanCard;
