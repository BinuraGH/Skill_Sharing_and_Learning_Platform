import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const HomeRightSection = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);// All users from backend
  const [currentUser, setCurrentUser] = useState(null);// Currently logged-in user
  const [following, setFollowing] = useState([]);// List of followed user IDs
  const [hoveredUserId, setHoveredUserId] = useState(null);// User ID being hovered (for hover text)
  const [fadingOutUserId, setFadingOutUserId] = useState(null); // User ID being animated out 

  // Fetch current logged-in user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/auth/me", { credentials: "include" });
        const data = await res.json();
        setCurrentUser(data);
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/auth/all-users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  // Fetch following list for current user
  useEffect(() => {
    const fetchFollowing = async () => {
      if (!currentUser?.id) return;
      try {
        const res = await fetch(`http://localhost:8080/api/follow/${currentUser.id}/following`);
        const data = await res.json();
        const followedIds = data.map(f => String(f.followedId));
        setFollowing(followedIds);
      } catch (err) {
        console.error("Error fetching following list:", err);
      }
    };

    fetchFollowing();
  }, [currentUser]);

  //Follow/Unfollow handler
  const toggleFollow = async (followedId) => {
    const isFollowing = following.includes(followedId);
    if (!currentUser?.id) return;

    try {
      if (!isFollowing) {

        // Trigger fade-out animation
        setFadingOutUserId(followedId);

        // Send follow request
        await fetch(`http://localhost:8080/api/follow?followerId=${currentUser.id}&followedId=${followedId}`, {
          method: 'POST'
        });

        // Wait for animation and update UI
        setTimeout(() => {
          setFollowing(prev => [...prev, followedId]);
          setFadingOutUserId(null);
        }, 300); // match CSS transition
      } else {
        // Send unfollow request

        await fetch(`http://localhost:8080/api/follow?followerId=${currentUser.id}&followedId=${followedId}`, {
          method: 'DELETE'
        });
        setFollowing(prev => prev.filter(id => id !== followedId));
      }
    } catch (err) {
      console.error("Error following/unfollowing:", err);
    }
  };

  //Show loading state while fetching data
  if (!currentUser || users.length === 0) {
    return (
      <div className="right-section bg-white rounded-xl p-4 shadow-md">
        <h4 className="text-lg font-semibold mb-4">Suggested for you</h4>
        <p className="text-gray-400 text-sm">Loading suggestions...</p>
      </div>
    );
  }


  return (
    <div className="right-section bg-white rounded-xl p-4 shadow-md">
      <h4 className="text-lg font-semibold mb-4">Suggested for you</h4>

      {/* 🔄 Suggested user list */}
      <ul className="suggested-list space-y-4">
        {users
          .filter(user =>
            String(user.id) !== String(currentUser?.id) &&
            !following.includes(String(user.id))
          )

          .map((user, index) => {
            const isFollowing = following.includes(user.id);
            const isHovered = hoveredUserId === user.id;

            return (
              <li
                key={user.id}
                className={`transition-opacity duration-300 ${fadingOutUserId === user.id ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
              >
                <div className="suggested-item flex items-center justify-between">
                  {/* User info */}
                  <div
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => navigate(`/user/${user.id}`)}
                  >
                    <img
                      src={user.profilePicture || `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 10}.jpg`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="font-medium hover:underline">{user.name}</p>
                  </div>

                  {/* Follow/Unfollow Button */}
                  <button
                    onClick={() => toggleFollow(user.id)}
                    onMouseEnter={() => setHoveredUserId(user.id)}
                    onMouseLeave={() => setHoveredUserId(null)}
                    className={`px-4 py-1.5 text-sm rounded font-medium transition shadow 
                      ${isFollowing
                        ? 'bg-gray-200 text-gray-800 hover:bg-red-100 hover:text-red-600'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                  >
                    {isFollowing ? (isHovered ? "Unfollow" : "Following") : "Follow"}
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
      {/* No more suggestions */}
      {users.filter(user => user.id !== currentUser?.id && !following.includes(user.id)).length === 0 && (
        <p className="text-gray-500 text-sm mt-2">No more suggestions</p>
      )}
    </div>
  );

};

export default HomeRightSection;