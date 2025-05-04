import React from 'react';
import './LearningPlanCard.css';
import { useNavigate } from 'react-router-dom';

const LearningPlanCard = ({ plan }) => {
  const navigate = useNavigate();
  if (!plan) return null;

  const {
    id,
    title,
    description,
    status,
    progress = 0,
    isPaid,
    price,
    thumbnailUrl
  } = plan;

  const handleClick = () => {
    navigate(`/plans/${id}`);
  };

  return (
    <div className="learning-plan-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img
        src={thumbnailUrl || 'https://via.placeholder.com/300x180.png?text=No+Image'}
        alt={title}
        className="learning-plan-thumbnail"
      />

      <div className="learning-plan-content">
        <h3 className="learning-plan-title">{title || "Untitled"}</h3>
        <p className="learning-plan-description">{description || "No Description"}</p>

        <div className="learning-plan-tags">
          <span className={`badge ${status === 'Completed' ? 'green' : 'yellow'}`}>
            {status || "Unknown"}
          </span>
          <span className="price">
            {isPaid ? `$${price?.toFixed(2)}` : "Free"}
          </span>
        </div>

        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">{progress}% completed</p>
      </div>
    </div>
  );
};

export default LearningPlanCard;
