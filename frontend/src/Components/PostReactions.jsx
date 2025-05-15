import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaHeart, FaMedal } from 'react-icons/fa';
import { toast } from 'react-toastify';

const REACTIONS = [
  { type: 'like', icon: <FaThumbsUp className="text-blue-500" /> },
  { type: 'heart', icon: <FaHeart className="text-red-500" /> },
  { type: 'celebrate', icon: <FaMedal className="text-green-500" /> },
];

const getColoredIcon = (type) => {
  switch (type) {
    case 'like':
      return <FaThumbsUp className="text-blue-500" />;
    case 'heart':
      return <FaHeart className="text-red-500" />;
    case 'celebrate':
      return <FaMedal className="text-green-500" />;
    default:
      return <FaThumbsUp />;
  }
};

const PostReactions = ({ postId }) => {
  const [user, setUser] = useState(null);
  const [userReaction, setUserReaction] = useState(null);
  const [loadingUserReaction, setLoadingUserReaction] = useState(true);
  const [reactionCounts, setReactionCounts] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [showFlyout, setShowFlyout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allReactions, setAllReactions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/auth/me', {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);


  // Fetch total reaction counts (always)
  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/reactions/count', {
          params: { postId },
        });
        setReactionCounts(res.data);
        const total = Object.values(res.data).reduce((sum, count) => sum + count, 0);
        setTotalCount(total);
      } catch (err) {
        console.error('Error fetching reactions:', err);
      }
    };

    fetchReactions();
  }, [postId]);

  // Fetch user-specific reaction whenever user ID or postId changes
  useEffect(() => {
    if (!user?.id) {
      setUserReaction(null);
      return;
    }

    const fetchUserReaction = async () => {
      setLoadingUserReaction(true);
      try {
        const res = await axios.get('http://localhost:8080/api/reactions/user', {
          params: { postId, userId: user.id },
          withCredentials: true
        });
        console.log("Userreactiions:", res.data);
        if (res.data?.type) {
          setUserReaction(res.data.type);
        } else {
          setUserReaction(null); // Explicitly clear if no reaction found
        }
      } catch (err) {
        console.error('Error fetching user reaction:', err);
        setUserReaction(null); // Prevent stale reaction on error
      } finally {
        setLoadingUserReaction(false);
      }
    };

    fetchUserReaction();
  }, [user?.id, postId]);

  const fetchAllReactions = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/reactions/post`, {
        params: { postId },
        withCredentials: true,
      });
      console.log("Reactionlist:", res.data);
      setAllReactions(res.data);
      setShowPopup(true);
    } catch (err) {
      console.error('Error fetching all reactions:', err);
    }
  };


  const handleReaction = async (type) => {
    if (loading || !user) return;
    setLoading(true);

    try {
      if (userReaction === type) {
        // Remove reaction
        await axios.delete('http://localhost:8080/api/reactions', {
          params: { postId, userId: user.id },
          withCredentials: true,
        });
        setUserReaction(null);
      } else {
        // Add or change reaction
        await axios.post(
          'http://localhost:8080/api/reactions',
          { postId, userId: user.id, userName: user.name, type },
          { withCredentials: true }
        );
        setUserReaction(type);
      }

      // Refresh reaction counts
      const res = await axios.get('http://localhost:8080/api/reactions/count', {
        params: { postId },
      });
      setReactionCounts(res.data);
      const total = Object.values(res.data).reduce((sum, count) => sum + count, 0);
      setTotalCount(total);
    } catch (err) {
      toast.error('Reaction failed');
      console.error(err);
    } finally {
      setShowFlyout(false);
      setLoading(false);
    }
  };

  const toggleFlyout = () => {
    setShowFlyout((prev) => !prev);
  };

  const isUserReacted = userReaction !== null;

  return (
    <div className="relative inline-block text-sm">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => {
            if (userReaction) {
              handleReaction(userReaction); // Remove reaction
            } else {
              toggleFlyout(); // Open options
            }
          }}
          className={`flex items-center justify-center w-10 h-10 border rounded-full ${isUserReacted ? 'bg-blue-200' : 'bg-gray-300'
            } hover:bg-gray-100 transition`}
        >
          {loadingUserReaction ? (
            <FaThumbsUp />
          ) : userReaction ? (
            getColoredIcon(userReaction)
          ) : (
            <FaThumbsUp />
          )}
        </button>
        <button onClick={fetchAllReactions} className="text-gray-500 hover:underline">
          {totalCount}
        </button>
      </div>

      {showPopup && (
        <div className="absolute top-full left-0 mt-2 bg-white border shadow-lg rounded-lg z-20 p-4 w-64">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Reactions</h3>
            <button
              onClick={() => setShowPopup(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <ul className="max-h-64 overflow-y-auto space-y-2">
            {allReactions.map((reaction) => (
              <li key={reaction.id} className="flex items-center space-x-2">
                {getColoredIcon(reaction.type)}
                <span className="text-sm text-gray-700">{reaction.userName}</span>
              </li>
            ))}
          </ul>
        </div>
      )}


      {showFlyout && (
        <div className="absolute z-10 flex bg-white shadow-md rounded-full px-2 py-1 space-x-3 border top-full mt-2">
          {REACTIONS.map((r) => (
            <button
              key={r.type}
              onClick={() => handleReaction(r.type)}
              className={`text-xl p-2 rounded-full transition ${userReaction === r.type
                  ? 'ring-2 ring-offset-1 ring-blue-300'
                  : 'hover:bg-gray-100'
                }`}
            >
              {r.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostReactions;
