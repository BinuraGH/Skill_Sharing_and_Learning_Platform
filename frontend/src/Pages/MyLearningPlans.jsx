import React, { useEffect, useState } from 'react';
import LearningPlanCard from '../Components/LearningPlanCard';

const MyLearningPlans = () => {
  const [plansWithProgress, setPlansWithProgress] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/plans/user/user123`);
        const plans = await res.json();

        // Fetch progress for each plan
        const enriched = await Promise.all(
          plans.map(async (plan) => {
            const progressRes = await fetch(`http://localhost:8080/api/plans/${plan.id}/progress`);
            const { progressPercentage } = await progressRes.json();

            return {
              ...plan,
              progress: progressPercentage,
            };
          })
        );

        setPlansWithProgress(enriched);
      } catch (err) {
        console.error("❌ Error loading plans:", err);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Learning Plans</h1>
      <div className="flex flex-wrap gap-6">
        {plansWithProgress.length > 0 ? (
          plansWithProgress.map((plan) => (
            <LearningPlanCard key={plan.id} plan={plan} />
          ))
        ) : (
          <p className="text-gray-500">No learning plans found.</p>
        )}
      </div>
    </div>
  );
};

export default MyLearningPlans;
