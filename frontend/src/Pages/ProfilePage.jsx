import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';

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
                <p className="text-gray-500">{user?.id || 'Loading...'}</p>
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
            <div className="bg-white rounded-xl shadow p-6">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"

                    alt="Jane"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>

                    <p className="font-medium">Alex johnson</p>

                    <span className="text-xs text-gray-500">Skill Share</span>
                  </div>
                </div>
                <span className="text-gray-400 text-xl font-bold cursor-pointer">⋯</span>
              </div>

              {/* Post Image */}
              <img

                src={require('./react.png')}
                alt="Post"
                className="rounded-md w-full h-42 object-cover mb-3"

              />

              {/* Post Text */}
              <p className="mb-3 text-gray-800 text-sm">
                Just built my first React component library! Check out the code and let me know what you think.
                #React #UI #Frontend
              </p>

              {/* Tags */}
              <div className="flex gap-2 mb-3">
                {['#React', '#UI', '#Frontend'].map((tag) => (
                  <span key={tag} className="bg-gray-100 text-sm text-gray-600 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Interactions */}
              <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                <div className="flex gap-4">
                  <span>❤️</span>
                  <span>💬</span>
                  <span>📤</span>
                  <span>🔖</span>
                </div>
              </div>

              {/* Comment input */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <div className="flex justify-end mt-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
                    Reply
                  </button>
                </div>
              </div>

              {/* Comments */}
              <div className="text-sm space-y-4">
                <div>
                  <p className="font-semibold">Robert Fox <span className="text-xs text-gray-500">@robfox - 5/15/2023</span></p>
                  <p>Awesome work! Can you share the repo?</p>
                </div>
                <div>
                  <p className="font-semibold">Jane Cooper <span className="text-xs text-gray-500">@janecooper - 5/16/2023</span></p>
                  <p>Congrats on shipping this. Looks neat.</p>
                </div>
                <p className="text-gray-500">234 likes · <span className="underline cursor-pointer">View all 12 comments</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
