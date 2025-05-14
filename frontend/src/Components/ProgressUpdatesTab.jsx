import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressUpdateCard from '../Components/ProgressUpdateCard';
import LearningProgressForm from '../Components/LearningProgressForm';

const ProgressUpdatesTab = () => {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState(null);

  const fetchUpdates = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/progressupdates', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch updates');
      const data = await res.json();
      setUpdates(data);
    } catch (error) {
      console.error("Error fetching progress updates:", error);
    }
  };

  useEffect(() => {
    const fetchUserAndUpdates = async () => {
      try {
        const userRes = await fetch('http://localhost:8080/api/auth/me', {
          credentials: 'include',
        });
        if (!userRes.ok) throw new Error('Failed to fetch user');
        const userData = await userRes.json();
        setUser(userData);
        
        await fetchUpdates();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserAndUpdates();
  }, []);

  const handleCreateUpdate = async (newUpdate) => {
    try {
      const response = await fetch('http://localhost:8080/api/progressupdates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newUpdate),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const createdUpdate = await response.json();
      setUpdates(prev => [createdUpdate, ...prev]);
      setShowModal(false);
    } catch (error) {
      console.error('Failed to create progress update:', error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/progressupdates/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const updatedUpdate = await response.json();
      setUpdates(prev => prev.map(u => u._id === id ? updatedUpdate : u));
      setShowModal(false);
      setEditingUpdate(null);
    } catch (error) {
      console.error('Failed to update progress update:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/progressupdates/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      setUpdates(prev => prev.filter(u => u._id !== id));
    } catch (error) {
      console.error('Failed to delete progress update:', error);
    }
  };

  const openCreateModal = () => {
    setEditingUpdate(null);
    setShowModal(true);
  };

  const openEditModal = (update) => {
    setEditingUpdate(update);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-3xl font-bold text-gray-800">My Progress Updates</h3>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Update
          </button>
        </div>

        {/* Progress Cards Grid */}
        {updates.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {updates.map((update) => (
              <ProgressUpdateCard
                key={update._id}
                update={update}
                onEdit={openEditModal}
                onDelete={handleDelete}
                showActions={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">No progress updates yet.</p>
            <button
              onClick={openCreateModal}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Create Your First Update
            </button>
          </div>
        )}

        {/* Modal for Create/Edit Form */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <LearningProgressForm 
                initialData={editingUpdate}
                onSubmit={editingUpdate ? 
                  (data) => handleUpdate(editingUpdate._id, data) : 
                  handleCreateUpdate}
                onCancel={() => {
                  setShowModal(false);
                  setEditingUpdate(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressUpdatesTab;