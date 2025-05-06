import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanCard from '../Components/PlanCard';

const PlansTab = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/plans');
        const data = await res.json();
        setPlans(data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-3xl font-bold text-gray-800">All Learning Plans</h3>
          <button
            onClick={() => navigate('/plans')}
            className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Manage Plans
          </button>
        </div>

        {/* Plan Cards Grid */}
        {plans.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                showActions={false}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No learning plans available.</p>
        )}
      </div>
    </div>
  );
};

export default PlansTab;
