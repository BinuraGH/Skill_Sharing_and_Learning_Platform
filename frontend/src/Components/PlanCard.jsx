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

const PlanCard = ({ plan, onEdit, onDelete }) => {
  const navigate = useNavigate();
  if (!plan) return null;

  const { id, title, description, thumbnailUrl, topics = [] } = plan;

  const handleCardClick = (e) => {
    if (
      e.target.closest(".edit-btn") ||
      e.target.closest(".delete-btn")
    ) return;
    navigate(`/plans/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-[280px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-200 cursor-pointer flex flex-col justify-between m-4"
    >
      <img
        src={thumbnailUrl?.trim() || "https://via.placeholder.com/280x160.png?text=No+Image"}
        alt={title || "Course Thumbnail"}
        className="w-full h-40 object-cover bg-gray-100 border-b border-gray-200"
      />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-base font-semibold text-gray-800 truncate">{title || "Untitled Course"}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description || "No description provided."}</p>

        {topics.length > 0 && (
          <ul className="list-disc pl-5 text-sm text-gray-700 max-h-16 overflow-hidden space-y-1">
            {topics.slice(0, 3).map((topic, idx) => (
              <li key={idx} className="truncate">{topic.title || `Topic ${idx + 1}`}</li>
            ))}
          </ul>
        )}

        <div className="flex gap-3 pt-3">
          <button
            className="edit-btn inline-flex items-center gap-2 text-blue-700 border border-blue-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-50 transition"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            ✏️ Edit
          </button>

          <button
            className="delete-btn inline-flex items-center gap-2 text-red-600 border border-red-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-50 transition"
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
