// src/components/tabs/LearningPlansTab.jsx
import React from "react";
import PlanCard from "../Components/PlanCard";

const LearningPlansTab = ({ user, plans, setFormData, setIsEditing, setShowForm, handleEditPlan, setDeleteTarget }) => {
  return (
    <>
      <div className="flex justify-start mb-4">
        <button
          className="bg-purple-600 text-white px-5 py-2 rounded-md shadow hover:bg-purple-700 transition"
          onClick={() => {
            setFormData({
              userId: user?.id || '',
              title: '', description: '', status: 'In Progress',
              thumbnailUrl: '', courseDescription: '', updatedPlanId: '',
              topics: [{ title: '', description: '', completed: false, videoUrl: '' }],
            });
            setIsEditing(false);
            setShowForm(true);
          }}
        >
          📌 New Plan
        </button>
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">My Learning Plans</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 justify-items-center">
        {plans.map((plan) => (
          <PlanCard
            key={plan._id}
            plan={plan}
            onEdit={() => handleEditPlan(plan)}
            onDelete={() => setDeleteTarget(plan._id || plan.id)}
          />
        ))}
      </div>
    </>
  );
};

export default LearningPlansTab;
