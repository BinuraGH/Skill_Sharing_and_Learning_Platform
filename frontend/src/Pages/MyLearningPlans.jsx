import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import PlanCard from '../Components/PlanCard';
import LearningPlanForm from '../Components/LearningPlanForm';
import '../styles/ManagePlans.css';

const ManagePlans = () => {
  const [activeTab, setActiveTab] = useState('plans');
  const [showForm, setShowForm] = useState(false);
  const [plans, setPlans] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    userId: '', // ✅ Make sure this is set correctly when creating plans
    title: '',
    description: '',
    status: 'In Progress',
    thumbnailUrl: '',
    courseDescription: '',
    updatedPlanId: '',
    topics: [
      {
        title: '',
        description: '',
        completed: false,
        videoUrl: '',
      },
    ],
  });

  // ✅ Auto-fetch plans on load if needed (optional)
  useEffect(() => {
    const fetchUserAndPlans = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/auth/me', {
          credentials: 'include', // if using cookies/sessions
        });
  
        if (!res.ok) throw new Error('Failed to fetch user');
  
        const userData = await res.json();
        console.log("👤 User data:", userData);
        setUser(userData);
  
        // ✅ Set userId in formData
        setFormData((prev) => ({
          ...prev,
          userId: userData.id,
        }));
  
        // ✅ Fetch plans for that user
        await fetchPlans(userData.id);
      } catch (err) {
        console.error("❌ Error loading user or plans:", err);
      }
    };
  
    fetchUserAndPlans();
  }, []);
  

  const fetchPlans = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/plans/user/${userId}`);
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('❌ Error fetching plans:', error);
    }
  };

  const handleCreatePlan = async (newPlanData) => {
    try {
      const response = await fetch('http://localhost:8080/api/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlanData),
      });

      const savedPlan = await response.json();
      setPlans((prev) => [savedPlan, ...prev]);
      setShowForm(false);
    } catch (error) {
      alert('❌ Failed to create plan.');
    }
  };

  const handleEditPlan = (plan) => {
    const planId = plan._id || plan.id;
    console.log("✏️ Editing plan ID:", planId);
    setFormData({ ...plan, updatedPlanId: planId });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdatePlan = async (updatedPlanData) => {
    try {
      const id = updatedPlanData.updatedPlanId;
      console.log("🔥 Sending PUT to ID:", id);

      const response = await fetch(`http://localhost:8080/api/plans/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPlanData),
      });

      if (!response.ok) throw new Error("Update failed");

      await response.json();
      await fetchPlans(updatedPlanData.userId);
      setShowForm(false);
      setIsEditing(false);
    } catch (error) {
      alert('❌ Failed to update plan.');
    }
  };

  const handleDeletePlan = async (planObj) => {
    const planId = planObj?._id || planObj?.id;
    if (!planId) {
      console.error("❌ Plan ID is undefined:", planObj);
      return;
    }
  
    console.log("🗑 Deleting plan ID:", planId);
  
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
  
    try {
      const res = await fetch(`http://localhost:8080/api/plans/${planId}`, {
        method: 'DELETE',
      });
  
      if (res.ok) {
        await fetchPlans(formData.userId);
      } else {
        alert('❌ Failed to delete.');
      }
    } catch (err) {
      alert('❌ Delete error.');
      console.error(err);
    }
  };
  
  
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-white to-gray-100 min-h-screen p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Manage Your Learning</h2>

        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-white rounded-lg shadow p-1">
            <button
              className={`px-4 py-2 rounded-l-md font-medium ${activeTab === 'plans' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-purple-600'}`}
              onClick={() => setActiveTab('plans')}
            >
              Learning Plans
            </button>
            <button
              className={`px-4 py-2 rounded-r-md font-medium ${activeTab === 'progress' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-purple-600'}`}
              onClick={() => setActiveTab('progress')}
            >
              Progress Updates
            </button>
          </div>
        </div>

        <div className="flex justify-start mb-4">
          <button
            className="bg-purple-600 text-white px-5 py-2 rounded-md shadow hover:bg-purple-700 transition"
            onClick={() => {
              setFormData({
                userId: user?.id || '',
                title: '',
                description: '',
                status: 'In Progress',
                thumbnailUrl: '',
                courseDescription: '',
                updatedPlanId: '',
                topics: [
                  {
                    title: '',
                    description: '',
                    completed: false,
                    videoUrl: '',
                  },
                ],
              });
              setIsEditing(false);
              setShowForm(true);
            }}
          >
            📌 New Plan
          </button>

        </div>

        {showForm && (
          <LearningPlanForm
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
            onSubmit={isEditing ? handleUpdatePlan : handleCreatePlan}
            onCancel={() => {
              setShowForm(false);
              setIsEditing(false);
              setFormData((prev) => ({ ...prev, updatedPlanId: '' }));
            }}
          />

        )}

        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">My Learning Plans</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {plans.map((plan) => (
            <PlanCard
              key={plan._id}
              plan={plan}
              onEdit={() => handleEditPlan(plan)}
              onDelete={(planObj) => handleDeletePlan(planObj)} 
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ManagePlans;
