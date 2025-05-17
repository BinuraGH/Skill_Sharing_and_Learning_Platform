import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowUserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [profileUser, setProfileUser] = useState(null); // the user being viewed
  const [currentUser, setCurrentUser] = useState(null); // logged-in user
  const [editingPostId, setEditingPostId] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  // 🔁 Fetch users (logged-in + profile being viewed)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const currentRes = await axios.get('http://localhost:8080/api/auth/me', {
          withCredentials: true,
        });
        setCurrentUser(currentRes.data);

        if (userId) {
          const profileRes = await axios.get(`http://localhost:8080/api/auth/user/${userId}`);
          setProfileUser(profileRes.data);
        } else {
          setProfileUser(currentRes.data);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [userId]);

  // 🔁 Fetch all posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/skill-sharing");
      setPosts(res.data.reverse()); // Latest first
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]); // ✅ re-fetch if profile changes

  const visiblePosts = posts.filter(post => post.userId === profileUser?.id);

  const handleEditClick = (post) => {
    setEditingPostId(post.id);
    setUpdatedDescription(post.description);
  };

  const handleSaveClick = async (postId) => {
    try {
      await axios.put(`http://localhost:8080/api/skill-sharing/${postId}?description=${encodeURIComponent(updatedDescription)}`);
      setEditingPostId(null);
      fetchPosts();
      toast.success("Post updated!");
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const confirmDelete = (postId) => {
    setPostToDelete(postId);
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/skill-sharing/${postToDelete}`);
      fetchPosts();
      toast.success("Post deleted!");
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setShowConfirm(false);
      setPostToDelete(null);
    }
  };

  const MediaGrid = ({ media }) => {
    if (!media?.length) return null;
    const isVideo = (url) => url.includes(".mp4") || url.includes("video");

    const renderMedia = (url, idx) =>
      isVideo(url) ? (
        <video key={idx} src={url} controls className="w-full h-full object-cover rounded" />
      ) : (
        <img key={idx} src={url} alt={`media-${idx}`} className="w-full h-full object-cover rounded" />
      );

    const count = media.length;

    return (
      <div className="w-full h-80 rounded overflow-hidden">
        {count === 1 && <div>{renderMedia(media[0], 0)}</div>}
        {count === 2 && (
          <div className="grid grid-cols-2 gap-1 h-full">
            {renderMedia(media[0], 0)}
            {renderMedia(media[1], 1)}
          </div>
        )}
        {count === 3 && (
          <div className="grid grid-rows-[2fr_1fr] gap-1 h-full">
            <div>{renderMedia(media[0], 0)}</div>
            <div className="grid grid-cols-2 gap-1 h-full">
              {renderMedia(media[1], 1)}
              {renderMedia(media[2], 2)}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {visiblePosts.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">No posts yet 💤</div>
      ) : (
        visiblePosts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-4 space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img src={profileUser?.profilePicture || '/default-avatar.png'} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-semibold text-gray-800">{post.uname}</div>
                  <div className="text-sm text-gray-500">Skill Share</div>
                </div>
              </div>

              {/* Show edit/delete buttons only if viewing own profile */}
              {currentUser?.id === profileUser?.id && (
                <div className="flex gap-2">
                  {editingPostId === post.id ? (
                    <button onClick={() => handleSaveClick(post.id)} className="px-4 py-2 text-green-500 border border-green-500 rounded">Save</button>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(post)} className="px-4 py-2 text-blue-500 border border-blue-500 rounded"><FaEdit /></button>
                      <button onClick={() => confirmDelete(post.id)} className="px-4 py-2 text-red-500 border border-red-500 rounded"><FaTrash /></button>
                    </>
                  )}
                </div>
              )}
            </div>

            <MediaGrid media={post.media} />

            {editingPostId === post.id ? (
              <textarea
                className="w-full border rounded p-2"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            ) : (
              <p className="text-gray-700">{post.description}</p>
            )}
          </div>
        ))
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-lg font-semibold">Are you sure you want to delete this post?</h2>
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={handleDeleteConfirmed} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Yes, Delete</button>
              <button onClick={() => setShowConfirm(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowUserPosts;
