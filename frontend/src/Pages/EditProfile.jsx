import React, { useState } from "react";
import Navbar from "../Components/Navbar";

const EditProfile = () => {
  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js"]);
  const [learning, setLearning] = useState(["Rust", "WebAssembly", "ML"]);
  const [newSkill, setNewSkill] = useState("");
  const [newLearning, setNewLearning] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleAddLearning = () => {
    if (newLearning.trim()) {
      setLearning([...learning, newLearning.trim()]);
      setNewLearning("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      {/* <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-purple-600">📘 CodeShare</h1>
            <input
              type="text"
              placeholder="Search developers, skills, topics..."
              className="hidden md:block w-96 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button>
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              className="w-8 h-8 rounded-full"
              alt="Profile"
            />
          </div>
        </div>
      </header> */}

      {/* Edit Profile Content */}
      <main className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>

          <div className="flex flex-col items-center mb-6">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              className="w-24 h-24 rounded-full mb-2"
              alt="Profile"
            />
            <a href="#" className="text-sm text-purple-500 hover:underline">
              Change profile picture
            </a>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  defaultValue="Alex Johnson"
                  className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  defaultValue="alexj"
                  className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Bio</label>
              <textarea
                rows="3"
                defaultValue="Full Stack Developer | Open Source Contributor | Lifelong Learner"
                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Location</label>
                <input
                  type="text"
                  defaultValue="San Francisco, CA"
                  className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Website</label>
                <input
                  type="url"
                  defaultValue="https://alexjohnson.dev"
                  className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium mb-1">Skills</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-sm px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Currently Learning */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Currently Learning
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {learning.map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newLearning}
                  onChange={(e) => setNewLearning(e.target.value)}
                  placeholder="Add what you're learning"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={handleAddLearning}
                  className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
