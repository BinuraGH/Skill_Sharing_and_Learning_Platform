import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import ShowUserPosts from './ShowUserPosts';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/auth/me', {
          withCredentials: true, // Important for session-based auth!
        });
        setUser(res.data);
        console.log("Data dee", res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Header Gradient */}
      <div className="w-full h-40 bg-gradient-to-r from-purple-400 to-indigo-500"></div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Avatar"
                  className="w-28 h-28 rounded-full border-4 border-white -mt-16 shadow-lg"
                />

                <h2 className="text-xl font-bold mt-4">{user?.name || 'Loading...'}</h2>
                <p className="text-gray-500">{user?.email || 'Loading...'}</p>
              </div>
              <div className="mt-4 text-sm text-gray-700">
                <p className="mb-2">
                  Full Stack Developer | Open Source Contributor | Lifelong Learner
                </p>
                <p>📍 San Francisco, CA</p>
                <p>🌐 alexjohnson.dev</p>
                <p>📅 Joined January 2022</p>
                <p className="mt-2 font-medium">
                  <span className="text-black">1,204</span> followers ·{' '}
                  <span className="text-black">356</span> following
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'GraphQL'].map((skill) => (
                  <span key={skill} className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Currently Learning */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-3">Currently Learning</h3>
              <div className="flex flex-wrap gap-2">
                {['Rust', 'WebAssembly', 'Machine Learning'].map((topic) => (
                  <span key={topic} className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Feed */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex items-center justify-between mb-4">
              {/* <div className="flex gap-6 border-b w-full">
                {['Skills', 'Progress', 'Learning Plans'].map((tab) => (
                  <button key={tab} className="px-3 py-2 text-gray-600 font-medium hover:text-black border-b-2 border-transparent hover:border-black">
                    {tab}
                  </button>
                ))}
              </div> */}
              {/* <button className="bg-gray-200 text-sm px-4 py-2 rounded-md">Edit Profile</button> */}
            </div>

            {/* Post */}
            <ShowUserPosts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
