import React from 'react';
import { FaHeart, FaComment, FaShare, FaBookmark } from 'react-icons/fa';

const ProgressUpdate = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800">Your Progress Updates</h2>
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded text-sm">
          Manage Updates
        </button>
      </div>

      {/* Progress Card */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* User Info */}
        <div className="p-4 flex items-center space-x-3">
          <img
            src="https://randomuser.me/api/portraits/men/56.jpg"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-800">Robert Fox</h3>
            <span className="text-sm text-gray-500">📈 Progress Share</span>
          </div>
        </div>

        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1581090700227-1e8f2e2e4a3f"
          alt="code screen"
          className="w-full h-64 object-cover"
        />

        {/* Description */}
        <div className="p-4 space-y-3">
          <p className="text-gray-700">
            Week 3 of my Python journey. Completed the data structures module and built a simple CLI tool.
            Next up: APIs and requests! <span className="text-blue-600">#Python</span>{' '}
            <span className="text-blue-600">#LearningToCode</span>
          </p>

          {/* Course Completion Box */}
          <div className="bg-green-100 border border-green-300 text-green-800 text-sm p-3 rounded-md">
            <strong>Course Completion</strong><br />
            Completed 3/10 modules of Python for Data Science
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {['#Python', '#Learning', '#DataScience'].map((tag) => (
              <span
                key={tag}
                className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6 text-gray-500">
            <FaHeart className="cursor-pointer hover:text-red-500" />
            <FaComment className="cursor-pointer hover:text-blue-500" />
            <FaShare className="cursor-pointer hover:text-green-500" />
            <FaBookmark className="cursor-pointer hover:text-yellow-500" />
          </div>

          {/* Comments */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <button className="mt-2 px-4 py-1 text-sm bg-purple-100 text-purple-600 rounded hover:bg-purple-200">
              Reply
            </button>
          </div>

          {/* Likes + View Comments */}
          <div className="text-sm text-gray-500 mt-2">
            <p><strong>156 likes</strong></p>
            <button className="hover:underline">View all 8 comments</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressUpdate;
