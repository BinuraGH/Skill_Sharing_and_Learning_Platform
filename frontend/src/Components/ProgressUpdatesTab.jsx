// Pages/ProgressUpdatesTab.jsx
import React, { useEffect, useState } from 'react';
import ProgressUpdateCard from '../Components/ProgressUpdateCard';
import LearningProgressForm from '../Components/LearningProgressForm';

const ProgressUpdatesTab = () => {
  
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const userRes = await fetch('http://localhost:8080/api/auth/me', {
          credentials: 'include',
        });
        if (!userRes.ok) throw new Error('Failed to fetch user');
        const userData = await userRes.json();
        setUser(userData);
      } catch (err) {
        console.error('Error loading user or updates:', err);
      }
    })();
  }, []);

  const openCreateModal = () => {
    setShowModal(true);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-3xl font-bold text-gray-800">My Progress Updates</h3>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Update
          </button>
        </div>

        <ProgressUpdateCard />
          </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <LearningProgressForm onPostSuccess={()=> setShowModal(false)} onCancel={()=> setShowModal(false)}  />
            </div>
          </div>
        )}
      </div>
   
  );
};

export default ProgressUpdatesTab;