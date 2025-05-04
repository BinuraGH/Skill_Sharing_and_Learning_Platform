import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedTab = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [user, setUser] = useState(null); // State to store logged-in user's data

  // Hardcoded IDs
  // const userId = "680cb06ce666217f76cff268";
  const postId = "680d1515792c2d35b5572f28";

  useEffect(() => {
    fetchComments();
    fetchCurrentUser();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/comments/post/${postId}`);
      setComments(res.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/auth/me');
      console.log(res.data)
      setUser(res.data); // Set the user data from backend
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setIsPosting(true);

    try {
      const commentData = { text: newComment, userId: user?.id, postId };
      const res = await axios.post('http://localhost:8080/api/comments', commentData);

      if (res.data) {
        setComments(prev => [...prev, res.data]);
      } else {
        fetchComments();
      }

      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/comments/${commentId}`);
      console.log(res.data); // 👈 log backend response ("Success deleted with {id}")
  
      setComments(prevComments => prevComments.filter(c => c.id !== commentId)); // 👈 update local UI
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  
  

  const handleEditComment = async (commentId, newText) => {
    if (!newText.trim()) return;

    try {
      const updatedComment = { text: newText };
      const res = await axios.put(`http://localhost:8080/api/comments/${commentId}`, updatedComment);
      setComments(prev => prev.map(c => (c.id === commentId ? res.data : c)));
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <div className="tab-content p-4">
      {/* Post Form (disabled for now) */}
      <div className="post-form mb-6">
        <textarea
          placeholder="Share your coding skills, progress, or learning plan..."
          value=""
          onChange={() => {}}
          disabled
          className="w-full p-3 border rounded-lg mb-2"
        />
        <div className="media-buttons flex gap-2 mb-2">
          <button disabled className="bg-gray-300 px-3 py-2 rounded-lg">Add Photos</button>
          <button disabled className="bg-gray-300 px-3 py-2 rounded-lg">Add Video</button>
        </div>
        <input type="text" placeholder="Add tags..." disabled className="w-full p-2 border rounded-lg mb-2" />
        <button className="post-btn bg-blue-500 text-white py-2 px-4 rounded-lg" disabled>Post</button>
      </div>

      {/* Single Demo Post */}
      <div className="post bg-white rounded-lg shadow p-4">
        <div className="post-header flex items-center mb-4 w-2 h-2">
          <img
            className="profile-thumb w-2 h-2 rounded-full mr-4"
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User Profile"
          />
          <div>
            {/* <p className="font-bold mb-0">John Doe</p> */}
            <p className="font-bold mb-0">{user?.name || 'Guest'}</p> {/* Display the logged-in user's name */}

            <small className="text-gray-500">Skill Share</small>
          </div>
        </div>
        <p className="mb-4">This is a post about coding and learning new skills! 🚀 Let's build amazing projects together.</p>

        <img
          className="post-image w-full rounded-lg mb-4"
          // src="https://via.placeholder.com/400x200"
          src={require('./git.png')}
          alt="Post Content"
        />

        <div className="post-footer flex items-center gap-6 mb-4">
          <span
            className="cursor-pointer text-xl"
            onClick={handleLikeClick}
          >
            {liked ? "💜 Liked" : "🤍 Like"}
          </span>
          <span
            onClick={() => setShowComments(!showComments)}
            className="cursor-pointer text-xl"
          >
            💬 {comments.length} {showComments ? 'Hide Comments' : 'View Comments'}
          </span>
        </div>

        {/* Comments Section */}
        {showComments && (
          <>
            <div className="comments mt-4 space-y-3">
              {comments.map(comment => (
                <CommentItem
                  key={comment._id}
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
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                disabled={isPosting}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={handleAddComment}
                disabled={isPosting}
              >
                {isPosting ? "Posting..." : "Post"}
              </button>
            </div>
          </>
        )}
      </div>
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
          {comment.userId?.substring(0, 6) || 'User'}
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
