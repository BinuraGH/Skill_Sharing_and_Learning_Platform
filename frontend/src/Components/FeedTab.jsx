import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaChevronDown, FaChevronUp, FaPhotoVideo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FeedTab = () => {
  // const [comments, setComments] = useState([]);
  const [postComments, setPostComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [user, setUser] = useState(null); // State to store logged-in user's data
  const [expanded, setExpanded] = useState(false);
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

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

  const fetchComments = async (postId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/comments/post/${postId}`);
      setPostComments(prev => ({
        ...prev,
        [postId]: res.data
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async (postId) => {
    const commentText = newComment[postId];
    if (!commentText || typeof commentText !== 'string' || !commentText.trim()) return;
    setIsPosting(true);

    try {
      const commentData = {
        text: newComment[postId],
        userId: user?.id,
        userName: user?.name,  // ✅ pass this to backend
        postId: postId,
      }; const res = await axios.post('http://localhost:8080/api/comments', commentData);
      console.log('Comment added:', res.data);

      setPostComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), res.data]
      }));

      setNewComment(prev => ({ ...prev, [postId]: '' }));
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/comments/${commentId}`);

      // Find the post that contains this comment
      setPostComments(prevComments => {
        const updatedComments = { ...prevComments };

        for (const postId in updatedComments) {
          const commentList = updatedComments[postId];
          if (Array.isArray(commentList)) {
            updatedComments[postId] = commentList.filter(c => c.id !== commentId);
          }
        }

        return updatedComments;
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const navigate = useNavigate();

  const handleEditComment = async (commentId, newText) => {
    if (!newText.trim()) return;

    try {
      const updatedComment = { text: newText };
      const res = await axios.put(`http://localhost:8080/api/comments/${commentId}`, updatedComment);

      // Find the postId that contains this comment
      setPostComments(prev => {
        const updated = { ...prev };

        for (const postId in updated) {
          updated[postId] = updated[postId].map(c =>
            c.id === commentId ? res.data : c
          );
        }

        return updated;
      });

    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };


  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const toggleExpand = () => setExpanded(prev => !prev);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 3) {
      toast.warn("You can upload up to 3 media files.");
      return;
    }
    setMediaFiles(selectedFiles);
  };

  const handlePost = async () => {
    if (!description.trim()) {
      toast.error("Description is required.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("userId", user?.id);
    formData.append("description", description);
    mediaFiles.forEach(file => formData.append("media", file));

    try {
      await axios.post("http://localhost:8080/api/skill-sharing", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("Post uploaded successfully!");
      setDescription("");
      setMediaFiles([]);
      setExpanded(false);
      fetchPosts();
    } catch (error) {
      toast.error("Failed to upload post.");
      console.error("Upload error:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/skill-sharing");
      const postList = res.data.reverse();
      setPosts(postList);

      // 👇 Fetch comments for all posts once when posts are loaded
      postList.forEach(post => {
        fetchComments(post.id);  // ✅ Ensure `post.id` is used consistently
      });

    } catch (err) {
      console.error("Fetch posts error:", err);
    }
  };


  useEffect(() => {
    fetchPosts();
  }, []);

  const timeAgo = (date) => {
    const now = new Date();
    const createdDate = new Date(date);
    const diff = now - createdDate;

    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;

    const years = Math.floor(months / 12);
    return `${years} year${years === 1 ? '' : 's'} ago`;
  };

  const MediaGrid = ({ media }) => {
    if (!media?.length) return null;

    const isVideo = (url) => url.includes(".mp4") || url.includes("video");

    const renderMedia = (url, idx) => (
      isVideo(url) ? (
        <video
          key={idx}
          src={url}
          controls
          className="w-full h-full object-cover rounded"
        />
      ) : (
        <img
          key={idx}
          src={url}
          alt={`media-${idx}`}
          className="w-full h-full object-cover rounded"
        />
      )
    );

    const count = media.length;

    return (
      <div className="w-full h-80 rounded overflow-hidden">
        {count === 1 && (
          <div className="w-full h-full">
            {renderMedia(media[0], 0)}
          </div>
        )}

        {count === 2 && (
          <div className="grid grid-cols-2 gap-1 h-full">
            {renderMedia(media[0], 0)}
            {renderMedia(media[1], 1)}
          </div>
        )}

        {count === 3 && (
          <div className="grid grid-rows-[2fr_1fr] gap-1 h-full">
            <div className="w-full h-full">
              {renderMedia(media[0], 0)}
            </div>
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
    <div className="tab-content p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Post creation */}
      <div className="bg-white shadow-md rounded-lg p-4 space-y-4 mb-6">
        <div
          onClick={toggleExpand}
          className="text-xl font-semibold text-gray-800 flex items-center justify-between cursor-pointer"
        >
          <span>Add a Post</span>
          <span className="text-gray-600">
            {expanded ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
          </span>
        </div>

        {expanded && (
          <>
            <textarea
              placeholder="Describe your post…"
              className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded cursor-pointer hover:bg-gray-200">
                <span>Add Media Files</span>
                <FaPhotoVideo />
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {mediaFiles.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {mediaFiles.map((file, idx) => {
                    const url = URL.createObjectURL(file);
                    const isVideo = file.type.includes("video");

                    return isVideo ? (
                      <video
                        key={idx}
                        src={url}
                        controls
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <img
                        key={idx}
                        src={url}
                        alt={`preview-${idx}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    );
                  })}
                </div>
              )}
            </div>

            <button
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded self-end flex items-center gap-2 disabled:opacity-60"
              onClick={handlePost}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Posting...
                </>
              ) : (
                "Post"
              )}
            </button>
          </>
        )}

      </div>
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-center font-medium"
        style={{ width: '160px', alignSelf: 'flex-end' }}
        onClick={() => navigate('/userposts')}
      >
        Manage Posts
      </button>


      {posts.length === 0 ? (
        <div className="text-center text-gray-500 text-lg font-medium mt-10">
          No posts yet 💤
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-4 space-y-4 mb-6">
            {/* Header */}
            <div className="flex items-center space-x-3">
              <img src={`https://i.pravatar.cc/150?u=${post.userId}`} alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-semibold text-gray-800">{post.uname}</div>
                <div className="text-sm text-gray-500">Skill Share</div>
                <div className="text-xs text-gray-500">{timeAgo(post.dateTime)}</div>
              </div>
            </div>

            {/* Media Section */}
            <MediaGrid media={post.media} />

            {/* Description */}
            <p className="text-gray-700">{post.description}</p>

            <div className="post-footer flex items-center gap-6 mb-4">
              <span
                className="cursor-pointer text-xl"
                onClick={handleLikeClick}
              >
                {liked ? "💜 Liked" : "🤍 Like"}
              </span>
              <span
                onClick={() => {
                  const postId = post.id || post._id;
                  setShowComments((prev) => ({
                    ...prev,
                    [postId]: !prev[postId],
                  }));
                  fetchComments(postId);

                }}
                className="cursor-pointer text-xl"
              >
                💬{" "}
                {showComments[post.id]
                  ? `Hide ${postComments[post.id]?.length || 0} Comments`
                  : `View ${postComments[post.id]?.length || 0} Comments`}
              </span>
            </div>

            {/* Comments Section */}
            {showComments[post.id] && (
              <>
                <div className="comments mt-4 space-y-3">
                  {(postComments[post.id] || []).map((comment) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      onDelete={handleDeleteComment}
                      onEdit={handleEditComment}
                    />

                  ))}
                </div>

                <div className="add-comment flex gap-2 mt-4">
                  <input
                    className="flex-1 border rounded-lg p-2"
                    placeholder="Add a comment..."
                    value={newComment[post.id] || ""}
                    onChange={(e) =>
                      setNewComment((prev) => ({ ...prev, [post.id]: e.target.value }))
                    }
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                    disabled={isPosting}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleAddComment(post.id)}
                    disabled={isPosting}
                  >
                    {isPosting ? "Posting..." : "Post"}
                  </button>
                </div>
              </>
            )}
          </div>
        )))}
    </div>
  );
};

export default FeedTab;

// CommentItem component inside same file
const CommentItem = ({ comment, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  console.log('Comment inside CommentItem:', comment);

  const handleSave = async () => {
    await onEdit(comment.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-start gap-2">
      <div className="flex-1">
        <strong className="text-sm text-gray-700">
          {comment.userName || 'User'}
        </strong>

        {isEditing ? (
          <div className="flex items-center gap-2 mt-1">
            <input
              className="flex-1 border rounded-md p-1 text-sm"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button
              onClick={handleSave}
              className="text-green-500 hover:underline text-sm"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditText(comment.text);
              }}
              className="text-gray-400 hover:underline text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <p className="text-sm mt-1">{comment.text}</p>
        )}
      </div>

      {!isEditing && (
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            ✏️
          </button>
          <button
            onClick={async () => await onDelete(comment.id)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            🗑️
          </button>

        </div>
      )}
    </div>
  );
};

