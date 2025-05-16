// Pages/ProgressUpdatesTab.jsx
import React, { useEffect, useState } from 'react';
import ProgressUpdateCard from '../Components/ProgressUpdateCard';
import LearningProgressForm from '../Components/LearningProgressForm';

const ProgressUpdatesTab = () => {
  const [updates, setUpdates] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchUpdates = async (userId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/progressupdates/user/${userId}`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch updates');
      const data = await res.json();
      setUpdates(data);
    } catch (err) {
      console.error('Error fetching progress updates:', err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const userRes = await fetch('http://localhost:8080/api/auth/me', {
          credentials: 'include',
        });
        if (!userRes.ok) throw new Error('Failed to fetch user');
        const userData = await userRes.json();
        setUser(userData);
        await fetchUpdates(userData.id);
      } catch (err) {
        console.error('Error loading user or updates:', err);
      }
    })();
  }, []);

  const handleCreateUpdate = async (newUpdate) => {
    try {
      const payload = { ...newUpdate, userId: user.id };
      const res = await fetch('http://localhost:8080/api/progressupdates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Create failed');
      const created = await res.json();
      setUpdates((prev) => [created, ...prev]);
      setShowModal(false);
    } catch (err) {
      console.error('Failed to create:', err);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const payload = { ...updatedData, userId: user.id };
      const res = await fetch(`http://localhost:8080/api/progressupdates/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(`Update failed: ${res.status} - ${text}`);

      const updated = JSON.parse(text);
      setUpdates((prev) => prev.map((u) => (u._id === id ? updated : u)));
      setShowModal(false);
      setEditingUpdate(null);
    } catch (err) {
      console.error('❌ Failed to update:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/progressupdates/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Delete failed');
      setUpdates((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
      alert('Failed to delete progress update.');
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
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-3xl font-bold text-gray-800">My Progress Updates</h3>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Update
          </button>
        </div>

        {updates.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {updates.map((update) => (
              <ProgressUpdateCard
                key={update._id}
                update={update}
                onEdit={openEditModal}
                onDelete={() => setDeleteTarget(update._id)}
                showActions={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No progress updates yet.</p>
          </div>
        )}

        {deleteTarget && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-80">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Confirm Delete
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete this progress update? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    await handleDelete(deleteTarget);
                    setDeleteTarget(null);
                  }}
                  className="px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <LearningProgressForm
                initialData={editingUpdate}
                onSubmit={(data) => {
                  const updateId = editingUpdate?._id || editingUpdate?.id;
                  if (updateId) {
                    handleUpdate(updateId, data);
                  } else {
                    handleCreateUpdate(data);
                  }
                }}
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