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

// export default PlanCard;
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PlanCard.css";

const PlanCard = ({ plan, onEdit, onDelete }) => {
  const navigate = useNavigate();

  if (!plan) return null;

  const {
    id,
    title,
    description,
    thumbnailUrl,
    topics = [],
  } = plan;

  // Prevent card click when Edit/Delete is clicked
  const handleCardClick = (e) => {
    if (
      e.target.closest(".edit-btn") ||
      e.target.closest(".delete-btn")
    ) {
      return;
    }
    navigate(`/plans/${id}`);
  };

  return (
    <div className="learning-plan-card" onClick={handleCardClick}>
      <img
        src={
          thumbnailUrl?.trim()
            ? thumbnailUrl
            : "https://via.placeholder.com/300x180.png?text=No+Image"
        }
        alt={title}
        className="learning-plan-thumbnail"
      />
      <div className="learning-plan-content">
        <h3 className="learning-plan-title">{title}</h3>
        <p className="learning-plan-description">{description}</p>
        <ul className="course-topics">
          {topics.map((topic, index) => (
            <li key={index}>{topic.title}</li>
          ))}
        </ul>

        <div className="card-actions">
          <button className="edit-btn" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
            ✏️ Edit
          </button>
          <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;

