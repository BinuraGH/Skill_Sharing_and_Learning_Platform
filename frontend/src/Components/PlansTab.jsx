import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanCard from '../Components/PlanCard';

const PlansTab = () => {
  const navigate = useNavigate();

  //State to store all plans and logged-in user
  const [plans, setPlans] = useState([]);
  const [user, setUser] = useState(null);

  //Fetch user and all plans once component mounts
  useEffect(() => {
    const fetchUserAndPlans = async () => {
      try {
        // 🔹 1. Fetch user details
        const userRes = await fetch('http://localhost:8080/api/auth/me', {
          credentials: 'include', // important if using cookies/session
        });

        if (!userRes.ok) throw new Error('Failed to fetch user');

        const userData = await userRes.json();
        console.log("👤 Logged-in User:", userData);
        setUser(userData); // store if needed

        // Fetch all learning plans
        const plansRes = await fetch('http://localhost:8080/api/plans');
        if (!plansRes.ok) throw new Error('Failed to fetch plans');

        const plansData = await plansRes.json();
        setPlans(plansData);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };

    fetchUserAndPlans();
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

        {/* Plan List Display */}

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
