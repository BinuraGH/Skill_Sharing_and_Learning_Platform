// import React from 'react';
// import { FiEdit2, FiTrash2 } from 'react-icons/fi';
// import '../styles/ManagePlans.css';

// const PlanCard = ({ plan, onDelete, onEdit }) => {
//   const handleDeleteClick = () => {
//     if (plan._id && plan.userId) {
//       onDelete(plan._id, plan.userId);
//     } else {
//       console.error('Plan ID or User ID missing for delete!');
//     }
//   };

//   const handleEditClick = () => {
//     if (plan) {
//       onEdit(plan);
//     }
//   };

//   return (
//     <div className="plan-card">
//       <div className="card-header">
//         <div>
//           <h3>{plan.title}</h3>
//           <p className="subtitle">{plan.description || plan.subtitle}</p>

//           {parseFloat(plan.price) > 0 ? (
//             <p className="price">${parseFloat(plan.price).toFixed(2)}</p>
//           ) : (
//             <p className="free">Free</p>
//           )}
//         </div>

//         <div className="card-actions">
//           <button className="icon-btn" onClick={handleEditClick}>
//             <FiEdit2 />
//           </button>
//           <button className="icon-btn delete" onClick={handleDeleteClick}>
//             <FiTrash2 />
//           </button>
//         </div>
//       </div>

//       {/* Topics */}
//       {plan.topics && Array.isArray(plan.topics) && (
//         <ul className="topic-list">
//           {plan.topics.map((topic, index) => (
//             <li key={index}>{typeof topic === 'string' ? topic : topic.title}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PlanCard.css";

const PlanCard = ({ plan, onEdit, onDelete }) => {
  const navigate = useNavigate();
  if (!plan) return null;

  const { id, title, description, thumbnailUrl, topics = [] } = plan;

  // Navigate unless clicking Edit/Delete
  const handleCardClick = (e) => {
    if (
      e.target.closest(".edit-btn") ||
      e.target.closest(".delete-btn")
    ) return;
    navigate(`/plans/${id}`);
  };

  return (
    <div className="learning-plan-card" onClick={handleCardClick}>
      <img
        className="learning-plan-thumbnail"
        src={thumbnailUrl?.trim() || "https://via.placeholder.com/280x160.png?text=No+Image"}
        alt={title || "Course Thumbnail"}
      />

      <div className="learning-plan-content">
        <h3 className="learning-plan-title">{title || "Untitled Course"}</h3>
        <p className="learning-plan-description">{description || "No description provided."}</p>

        {topics.length > 0 && (
          <ul className="learning-plan-topics">
            {topics.slice(0, 3).map((topic, idx) => (
              <li key={idx}>{topic.title || `Topic ${idx + 1}`}</li>
            ))}
          </ul>
        )}

        <div className="learning-plan-actions">
          <button
            className="edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            ✏️ Edit
          </button>

          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
