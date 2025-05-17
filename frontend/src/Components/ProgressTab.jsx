import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img1 from '../assets/img1.jpg';

const ProgressTab = () => {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState([]);

  const fetchUpdates = async (userId) => {
      try {
        const res = await axios.get(`http://localhost:8080/api/progressupdates`);
        const postList = res.data.reverse();
      setUpdates(postList);
      } catch (err) {
        console.error('Error fetching progress updates:', err);
      }
    };

     useEffect(() => {
        fetchUpdates();
      }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-3xl font-bold text-gray-800">All Progress Updates</h3>
          <button
            onClick={() => navigate('/plans')}
            className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Manage Progress Updates
          </button>
        </div>

        {/* Progress Cards Grid */}
       {updates.length > 0 ? (
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {updates.map((update) => (
                  <div
        // onClick={handleCardClick}
        className="w-full max-w-xs bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 border border-gray-200 cursor-pointer flex flex-col justify-between"
      >
        
        {update.imgLink && (
                    <img
                      src={img1}
                      alt={update.title || 'Progress Image'}
                      className="w-full h-40 object-cover"
                    />
                  )}
        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {update.title || "Untitled Update"}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
               update.status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {update.status}
            </span>
          </div>

          <p className="text-sm text-gray-600">{update.caption || "No caption provided."}</p>         
        </div>
      </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No progress updates yet.</p>
              </div>
            )}
      </div>
    </div>
  );
};

export default ProgressTab;

