import React, { useEffect, useState } from 'react';

const HomeRightSection = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [following, setFollowing] = useState([]);
  const [hoveredUserId, setHoveredUserId] = useState(null);

  // 1️⃣ Fetch current logged-in user
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

  // 2️⃣ Fetch all users
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

  // 3️⃣ Fetch following list
  useEffect(() => {
    const fetchFollowing = async () => {
      if (!currentUser?.id) return;
      try {
        const res = await fetch(`http://localhost:8080/api/follow/${currentUser.id}/following`);
        const data = await res.json();
        const followedIds = data.map(f => f.followedId);
        setFollowing(followedIds);
      } catch (err) {
        console.error("Error fetching following list:", err);
      }
    };

    fetchFollowing();
  }, [currentUser]);

  // 4️⃣ Follow/Unfollow handler
  const toggleFollow = async (followedId) => {
    const isFollowing = following.includes(followedId);
    if (!currentUser?.id) return;

    try {
      if (isFollowing) {
        await fetch(`http://localhost:8080/api/follow?followerId=${currentUser.id}&followedId=${followedId}`, {
          method: 'DELETE'
        });
        setFollowing(prev => prev.filter(id => id !== followedId));
      } else {
        await fetch(`http://localhost:8080/api/follow?followerId=${currentUser.id}&followedId=${followedId}`, {
          method: 'POST'
        });
        setFollowing(prev => [...prev, followedId]);
      }
    } catch (err) {
      console.error("Error following/unfollowing:", err);
    }
  };

  return (
    <div className="right-section bg-white rounded-xl p-4 shadow-md">
      <h4 className="text-lg font-semibold mb-4">Suggested for you</h4>
      <ul className="suggested-list space-y-4">
        {users
          .filter(user => user.id !== currentUser?.id)
          .map((user, index) => {
            const isFollowing = following.includes(user.id);
            const isHovered = hoveredUserId === user.id;

            return (
              <li key={user.id}>
                <div className="suggested-item flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                  <img
                      src={
                        user.profilePicture?.trim()
                          ? user.profilePicture
                          : `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 10}.jpg`
                      }
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <p className="font-medium">{user.name}</p>
                  </div>
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
    </div>
  );
};

export default HomeRightSection;
