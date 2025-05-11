import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SkillShareForm from './SkillShareForm';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const FeedTab = () => {
  // const [comments, setComments] = useState([]);
  const [postComments, setPostComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [user, setUser] = useState(null); // State to store logged-in user's data
  const [posts, setPosts] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);

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


  //Vanuja
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


  //Vanuja
  useEffect(() => {
    fetchPosts();
  }, []);


  //Vanuja
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

    const renderMedia = (url, idx) => {
      const handleClick = () => {
        const items = media.map(m => ({
          original: m,
          thumbnail: m
        }));
        setGalleryItems(items);
        setShowGallery(true);
      };

      return isVideo(url) ? (
        <video
          key={idx}
          src={url}
          controls
          className="w-full h-full object-cover rounded transition-transform duration-300 hover:scale-105 cursor-pointer"
        />
      ) : (
        <img
          key={idx}
          src={url}
          alt={`media-${idx}`}
          onClick={handleClick}
          className="w-full h-full object-cover rounded transition-transform duration-300 hover:scale-105 cursor-pointer"
        />
      );
    };


    const count = media.length;

    return (
      <div className="w-full h-150 rounded ">
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
          <div className="grid grid-rows-2 gap-1 h-80">
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
      <SkillShareForm onPostSuccess={fetchPosts} />
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-center font-medium"
        style={{ width: '160px', alignSelf: 'flex-end' }}
        onClick={() => navigate('/userposts')}
      >
        Manage Posts
      </button>

      {/* Post list - vanuja */}
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
                <div className="font-semibold text-gray-800 hover:underline cursor-pointer">{post.uname}</div>
                <div className="text-sm text-gray-500">Skill Share</div>
                <div className="text-xs text-gray-500">{timeAgo(post.dateTime)}</div>
              </div>
            </div>

            {/* Media Section */}
            <MediaGrid media={post.media} />

            {/* Description */}
            <p className="text-gray-700">{post.description}</p>

            {/* Comments & likes -Thejani */}
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
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 w-full max-w-3xl relative p-5">
            <button
              className="absolute top-2 right-2 text-gray-700 text-lg font-bold"
              onClick={() => setShowGallery(false)}
            >
              &times;
            </button>
            <ImageGallery
              items={galleryItems}
              showThumbnails={true}
              showFullscreenButton={false}
              showPlayButton={false}
            />
          </div>
        </div>
      )}

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

