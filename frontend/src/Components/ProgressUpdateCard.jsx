// Components/ProgressUpdateCard.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img1 from '../assets/img1.jpg';

const ProgressUpdateCard = ({ updates, refreshUpdates }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    _id: '',
    title: '',
    caption: '',
    status: 'In Progress',
  });

  const confirmDelete = (postId) => {
    setPostToDelete(postId);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/progressupdates/${postToDelete}`);
      toast.error("Progress Update deleted successfully!");
      setShowConfirm(false);
      setPostToDelete(null);
      refreshUpdates();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        title: editData.title,
        caption: editData.caption,
        status: editData.status
      };
      await axios.put(`http://localhost:8080/api/progressupdates/${editData.id}`, payload);
      toast.success("Progress Update updated successfully!");
      setShowEditModal(false);
      refreshUpdates();
    } catch (err) {
      console.error('❌ Failed to update:', err);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {updates.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {updates.map((update) => (
            <div key={update.id} className="w-full max-w-xs bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 border border-gray-200 cursor-pointer flex flex-col justify-between">
              {update.imgLink && (
                <img
                  src={img1}
                  alt={update.title || 'Progress Image'}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{update.title || "Untitled Update"}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${update.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {update.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{update.caption || "No caption provided."}</p>
                <div className="flex gap-2">
                  <button
                    className="flex-1 text-blue-600 border border-blue-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-50 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditData(update);
                      setShowEditModal(true);
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="flex-1 text-red-600 border border-red-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-50 transition"
                    onClick={() => confirmDelete(update.id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">No progress updates yet.</div>
      )}

      {/* Confirm Delete Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Are you sure you want to delete this progress update?</h2>
            <div className="flex justify-center space-x-4 mt-4">
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Yes, Delete</button>
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Edit Progress Update</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Title</label>
                <input type="text" name="title" value={editData.title} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Caption</label>
                <textarea name="caption" value={editData.caption} onChange={handleChange} rows={4} className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Status</label>
                <select name="status" value={editData.status} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500">
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">Cancel</button>
                <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressUpdateCard;
