import React from 'react';
import { FaHeart, FaComment, FaShare, FaBookmark } from 'react-icons/fa';

const LearningPlan = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800">Your Learning Plans</h2>
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded text-sm">
          Manage Plans
        </button>
      </div>

      {/* Post Card */}
      <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-800">Cameron Williamson</h3>
            <span className="text-sm text-gray-500">📌 Plan Share</span>
          </div>
        </div>

        {/* Post Content */}
        <p className="text-gray-700">
          My roadmap to becoming a fullstack developer in 6 months. Feel free to follow along or suggest improvements!
        </p>

        {/* Roadmap Box */}
        <div className="bg-blue-50 rounded-md p-4">
          <h4 className="font-semibold text-blue-800 mb-2">
            Full Stack Web Development Roadmap
          </h4>
          <ol className="list-decimal pl-4 text-blue-900 space-y-1">
            <li>HTML, CSS & JavaScript Basics (2 weeks)</li>
            <li>React Frontend Development (4 weeks)</li>
            <li>Node.js Backend Development (4 weeks)</li>
            <li className="text-blue-600 cursor-pointer">+ 5 more steps</li>
          </ol>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {['#WebDevelopment', '#FullStack', '#LearningPlan'].map((tag) => (
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
        <div>
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
          />
          <button className="mt-2 px-4 py-1 text-sm bg-purple-100 text-purple-600 rounded hover:bg-purple-200">
            Reply
          </button>
        </div>

        {/* Likes + View Comments */}
        <div className="text-sm text-gray-500 mt-2">
          <p><strong>312 likes</strong></p>
          <button className="hover:underline">View all 24 comments</button>
        </div>
      </div>
    </div>
  );
};

export default LearningPlan;
