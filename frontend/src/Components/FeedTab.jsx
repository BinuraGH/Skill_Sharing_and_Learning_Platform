import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SkillShareForm from './SkillShareForm';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { FaPenAlt, FaTrash } from 'react-icons/fa';
import PostReactions from './PostReactions';
import EmojiPicker from 'emoji-picker-react';

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
  const [showEmojiPicker, setShowEmojiPicker] = useState({});


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

  const handleEmojiSelect = (emojiData, postId) => {
    setNewComment((prev) => ({
      ...prev,
      [postId]: (prev[postId] || '') + emojiData.emoji,
    }));
  };


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
        userName: user?.name,
        postId: postId,
      };

      const res = await axios.post('http://localhost:8080/api/comments', commentData);

      // Add profileImage manually to match existing DTO
      const newCommentWithProfile = {
        ...res.data,
        profileImage: user?.profilePicture || '', // ✅ add this line
      };

      setPostComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newCommentWithProfile]
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
            c.id === commentId
              ? {
                ...res.data,
                profileImage: c.profileImage || '', // ✅ Preserve existing image
              }
              : c
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
          className="w-full h-full object-cover rounded transition-transform duration-300 hover:scale-95 cursor-pointer"
        />
      ) : (
        <img
          key={idx}
          src={url}
          alt={`media-${idx}`}
          onClick={handleClick}
          className="w-full h-full object-cover rounded transition-transform duration-300 hover:scale-95 cursor-pointer"
        />
      );
    };


    const count = media.length;

    return (
      <div className="w-full h-150 rounded ">
        {count === 1 && (
          <div className="w-150 h-80">
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
          <div className="grid grid gap-1 h-full">
            <div className="w-150 h-80">
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
              <img
                src={
                  post.profilePicture && post.profilePicture.trim() !== ''
                    ? post.profilePicture
                    : `https://i.pravatar.cc/150?u=${post.userId}`
                }
                alt={post.uname}
                className="w-10 h-10 rounded-full object-cover"
              />

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
              // onClick={handleLikeClick}
              >
                {/* {liked ? "💜 Liked" : "🤍 Like"} */}
                <PostReactions postId={post.id} />
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
                      user={user}
                      postOwnerId={post.userId}
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
                    className="text-2xl"
                    onClick={() =>
                      setShowEmojiPicker((prev) => ({
                        ...prev,
                        [post.id]: !prev[post.id],
                      }))
                    }
                  >
                    😊
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleAddComment(post.id)}
                    disabled={isPosting}
                  >
                    {isPosting ? "Posting..." : "Post"}
                  </button>
                </div>

                {showEmojiPicker[post.id] && (
                  <div className="z-10">
                    <EmojiPicker onEmojiClick={(emojiData, event) => handleEmojiSelect(emojiData, post.id)} />
                  </div>
                )}
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
const CommentItem = ({ comment, onEdit, onDelete, user, postOwnerId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [showEditEmojiPicker, setShowEditEmojiPicker] = useState(false);

  const isCommentAuthor = user?.id === comment.userId;
  const isPostOwner = user?.id === postOwnerId;

  const handleSaveEdit = () => {
    if (!editedText.trim()) return;
    onEdit(comment.id, editedText);
    setIsEditing(false);
    setShowEditEmojiPicker(false);
  };

  const handleEmojiSelect = (emojiData) => {
    setEditedText((prev) => prev + emojiData.emoji);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const created = new Date(date);
    const diff = now - created;

    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="bg-gray-100 px-4 py-3 rounded-md shadow-sm flex gap-3 items-start hover:bg-gray-50 transition">
      {/* Avatar */}
      <img
        src={
          comment.profileImage && comment.profileImage.trim() !== ''
            ? comment.profileImage
            : `https://i.pravatar.cc/150?u=${comment.userId}`
        }
        alt={comment.userName}
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* Main content */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-sm text-gray-800">{comment.userName}</span>
          <span className="text-xs text-gray-500">{formatTimeAgo(comment.createdAt)}</span>
        </div>

        {isEditing ? (
          <>
            <div className="relative">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 mt-2 text-sm resize-none"
                rows={2}
                autoFocus
              />
              <button
                className="absolute bottom-2 right-2 text-xl"
                onClick={() => setShowEditEmojiPicker((prev) => !prev)}
              >
                😊
              </button>
              {showEditEmojiPicker && (
                <div className="z-10 mt-2">
                  <EmojiPicker onEmojiClick={(emojiData) => handleEmojiSelect(emojiData)} />
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSaveEdit}
                className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedText(comment.text);
                  setShowEditEmojiPicker(false);
                }}
                className="text-sm text-gray-600 hover:underline"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
        )}
      </div>

      {/* Edit/Delete Icons */}
      {(isCommentAuthor || isPostOwner) && !isEditing && (
        <div className="flex flex-col gap-2 mt-1 items-center text-gray-500 text-sm">
          {isCommentAuthor && (
            <button
              onClick={() => setIsEditing(true)}
              className="hover:text-blue-600"
              title="Edit"
            >
              <FaPenAlt size={14} />
            </button>
          )}
          <button
            onClick={() => onDelete(comment.id)}
            className="hover:text-red-600"
            title="Delete"
          >
            <FaTrash size={14} />
          </button>
        </div>
      )}
    </div>
  );
};