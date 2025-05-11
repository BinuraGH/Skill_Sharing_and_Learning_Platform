import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import LearningPlanForm from '../Components/LearningPlanForm';
import LearningPlansTab from '../Components/LearningPlansTab';
import ProgressUpdatesTab from '../Components/ProgressUpdatesTab';


const ManagePlans = () => {
  const [activeTab, setActiveTab] = useState('plans');
  const [showForm, setShowForm] = useState(false);
  const [plans, setPlans] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    userId: '', title: '', description: '', status: 'In Progress',
    thumbnailUrl: '', courseDescription: '', updatedPlanId: '',
    topics: [{ title: '', description: '', completed: false, videoUrl: '' }],
  });
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const fetchUserAndPlans = async () => {
      const res = await fetch('http://localhost:8080/api/auth/me', { credentials: 'include' });
      if (!res.ok) return;
      const userData = await res.json();
      setUser(userData);
      setFormData((prev) => ({ ...prev, userId: userData.id }));
      await fetchPlans(userData.id);
    };
    fetchUserAndPlans();
  }, []);

  const fetchPlans = async (userId) => {
    const res = await fetch(`http://localhost:8080/api/plans/user/${userId}`);
    const data = await res.json();
    setPlans(data);
  };

  const handleCreatePlan = async (newPlanData) => {
    const res = await fetch('http://localhost:8080/api/plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlanData),
    });
    const saved = await res.json();
    setPlans((prev) => [saved, ...prev]);
    setShowForm(false);
  };

  const handleEditPlan = (plan) => {
    const planId = plan._id || plan.id;
    setFormData({ ...plan, updatedPlanId: planId });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdatePlan = async (updated) => {
    const res = await fetch(`http://localhost:8080/api/plans/${updated.updatedPlanId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      await fetchPlans(updated.userId);
      setShowForm(false);
      setIsEditing(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const res = await fetch(`http://localhost:8080/api/plans/${deleteTarget}`, {
      method: 'DELETE',
    });
    if (res.ok) await fetchPlans(formData.userId);
    setDeleteTarget(null);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-white to-gray-100 min-h-screen p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Manage Your Learning</h2>

        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-white rounded-lg shadow p-1">
            <button className={`px-4 py-2 rounded-l-md font-medium ${activeTab === 'plans' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-purple-600'}`} onClick={() => setActiveTab('plans')}>Learning Plans</button>
            <button className={`px-4 py-2 rounded-r-md font-medium ${activeTab === 'progress' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-purple-600'}`} onClick={() => setActiveTab('progress')}>Progress Updates</button>
          </div>
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

        {activeTab === 'plans' ? (
          <LearningPlansTab
            user={user}
            plans={plans}
            setFormData={setFormData}
            setIsEditing={setIsEditing}
            setShowForm={setShowForm}
            handleEditPlan={handleEditPlan}
            setDeleteTarget={setDeleteTarget}
          />
        ) : (
          <ProgressUpdatesTab />
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this learning plan? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManagePlans;
