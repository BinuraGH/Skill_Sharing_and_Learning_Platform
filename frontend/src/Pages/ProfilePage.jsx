import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import ShowUserPosts from './ShowUserPosts';
import { useParams } from 'react-router-dom';


const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [hoveredFollowId, setHoveredFollowId] = useState(null);
  const [showFollowerPopup, setShowFollowerPopup] = useState(false);
  const [showFollowingPopup, setShowFollowingPopup] = useState(false);

  const followerTimeoutRef = useRef(null);
  const followingTimeoutRef = useRef(null);

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Gold':
        return 'bg-yellow-300 text-yellow-900';
      case 'Silver':
        return 'bg-gray-300 text-gray-800';
      case 'Bronze':
        return 'bg-amber-200 text-amber-900';
      default:
        return 'bg-gray-200 text-gray-500';
    }
  };

  // 🧠 Handle popup hover delay
  const handleFollowerMouseEnter = () => {
    clearTimeout(followerTimeoutRef.current);
    setShowFollowerPopup(true);
  };

  const handleFollowerMouseLeave = () => {
    followerTimeoutRef.current = setTimeout(() => {
      setShowFollowerPopup(false);
    }, 200);
  };

  const handleFollowingMouseEnter = () => {
    clearTimeout(followingTimeoutRef.current);
    setShowFollowingPopup(true);
  };

  const handleFollowingMouseLeave = () => {
    followingTimeoutRef.current = setTimeout(() => {
      setShowFollowingPopup(false);
    }, 200);
  };

  // 🔁 Fetch user + followers + following
  useEffect(() => {
    const fetchUserAndFollows = async () => {
      try {
        let targetUser;

        if (userId) {
          // Viewing someone else's profile
          const res = await axios.get(`http://localhost:8080/api/auth/user/${userId}`);
          targetUser = res.data;
        } else {
          // Viewing own profile
          const res = await axios.get('http://localhost:8080/api/auth/me', { withCredentials: true });
          targetUser = res.data;
        }

        setUser(targetUser);

        const followerRes = await axios.get(`http://localhost:8080/api/follow/${targetUser.id}/followers`);
        setFollowers(followerRes.data);

        const followingRes = await axios.get(`http://localhost:8080/api/follow/${targetUser.id}/following`);
        setFollowing(followingRes.data);
      } catch (err) {
        console.error('Failed to fetch user or follow data:', err);
      }
    };

    fetchUserAndFollows();
  }, [userId]);


  // ❌ Unfollow a user
  const handleUnfollow = async (followedId) => {
    try {
      await axios.delete(`http://localhost:8080/api/follow?followerId=${user.id}&followedId=${followedId}`);
      setFollowing((prev) => prev.filter((f) => f.followedId !== followedId));
    } catch (err) {
      console.error('Unfollow failed:', err);
    }
  };

  // ❌ Remove follower
  const handleRemoveFollower = async (followerId) => {
    try {
      await axios.delete(`http://localhost:8080/api/follow?followerId=${followerId}&followedId=${user.id}`);
      setFollowers((prev) => prev.filter((f) => f.followerId !== followerId));
    } catch (err) {
      console.error('Remove follower failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full h-40 bg-gradient-to-r from-purple-400 to-indigo-500"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src={user?.profilePicture || 'https://via.placeholder.com/150'}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full border-4 border-white -mt-16 shadow-lg"
                />
                <div className="flex items-center gap-2 mt-4">
                  <h2 className="text-xl font-bold">{user?.name || 'Loading...'}</h2>
                  {user?.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${getBadgeColor(user.badge)}`}
                      title="Badge earned by commenting"
                    >
                      {user.badge}
                    </span>
                  )}
                </div>
                <p className="text-gray-500">{user?.email || 'Loading...'}</p>
              </div>

              <div className="mt-4 text-sm text-gray-700">
                <p className="mb-2">Full Stack Developer | Open Source Contributor | Lifelong Learner</p>
                <p>📍 San Francisco, CA</p>
                <p>🌐 alexjohnson.dev</p>
                <p>📅 Joined January 2022</p>

                <div className="mt-2 font-medium relative flex space-x-6">
                  {/* Followers */}
                  <div
                    onMouseEnter={handleFollowerMouseEnter}
                    onMouseLeave={handleFollowerMouseLeave}
                    className="relative"
                  >
                    <div className="inline-block cursor-pointer">
                      <span className="text-black">{followers.length}</span> followers
                    </div>

                    {showFollowerPopup && (
                      <div className="absolute z-10 bg-white shadow-lg rounded-md border mt-1 w-60 text-left p-2 max-h-60 overflow-y-auto">
                        {followers.length === 0 ? (
                          <p className="text-xs text-gray-500">No followers yet</p>
                        ) : (
                          followers.map((f) => (
                            <div key={f.followerId} className="flex items-center justify-between py-1">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={f.followerProfilePicture || '/default-avatar.png'}
                                  className="w-6 h-6 rounded-full object-cover"
                                  alt=""
                                />
                                <span className="text-sm">{f.followerName}</span>
                              </div>
                              <button
                                className="text-xs text-red-500 hover:underline"
                                onClick={() => handleRemoveFollower(f.followerId)}
                              >
                                Remove
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  {/* Following */}
                  <div
                    onMouseEnter={handleFollowingMouseEnter}
                    onMouseLeave={handleFollowingMouseLeave}
                    className="relative"
                  >
                    <div className="inline-block cursor-pointer">
                      <span className="text-black">{following.length}</span> following
                    </div>

                    {showFollowingPopup && (
                      <div className="absolute z-10 bg-white shadow-lg rounded-md border mt-1 w-60 text-left p-2 max-h-60 overflow-y-auto">
                        {following.length === 0 ? (
                          <p className="text-xs text-gray-500">Not following anyone</p>
                        ) : (
                          following.map((f) => {
                            const isHovered = hoveredFollowId === f.followedId;
                            return (
                              <div
                                key={f.followedId}
                                className="flex items-center justify-between py-1"
                                onMouseEnter={() => setHoveredFollowId(f.followedId)}
                                onMouseLeave={() => setHoveredFollowId(null)}
                              >
                                <div className="flex items-center space-x-2">
                                  <img
                                    src={f.followedProfilePicture || '/default-avatar.png'}
                                    className="w-6 h-6 rounded-full object-cover"
                                    alt=""
                                  />
                                  <span className="text-sm">{f.followedName}</span>
                                </div>
                                <button
                                  onClick={() => handleUnfollow(f.followedId)}
                                  className={`text-xs px-2 py-0.5 rounded ${isHovered
                                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                    : 'bg-gray-200 text-gray-600'
                                    }`}
                                >
                                  {isHovered ? 'Unfollow' : 'Following'}
                                </button>
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React', 'Node.js'].map((s) => (
                  <span key={s} className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Currently Learning */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-3">Currently Learning</h3>
              <div className="flex flex-wrap gap-2">
                {['Rust', 'WebAssembly', 'Machine Learning'].map((t) => (
                  <span key={t} className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="lg:col-span-2">
            <ShowUserPosts userId={user?.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
