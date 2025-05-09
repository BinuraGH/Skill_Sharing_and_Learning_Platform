import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const ShowUserPosts = () => {

    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState("");
    const [editingPostId, setEditingPostId] = useState(null);
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const fetchPosts = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/skill-sharing");
            setPosts(res.data.reverse()); // show latest first
        } catch (err) {
            console.error("Fetch posts error:", err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleEditClick = (post) => {
        setEditingPostId(post.id);
        setUpdatedDescription(post.description);
    };

    const handleSaveClick = async (postId) => {
        try {
            await axios.put(`http://localhost:8080/api/skill-sharing/${postId}?description=${encodeURIComponent(updatedDescription)}`);
            setEditingPostId(null);
            fetchPosts(); // refresh after save
            toast.success("Post Saved successfully!");
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    const handleDeleteConfirmed = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/skill-sharing/${postToDelete}`);
            fetchPosts();
            toast.error("Post deleted successfully!");
        } catch (err) {
            console.error("Delete error:", err);
        } finally {
            setShowConfirm(false);
            setPostToDelete(null);
        }
    };

    const confirmDelete = (postId) => {
        setPostToDelete(postId);
        setShowConfirm(true);
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
        <div className="max-w-3xl mx-auto p-4 space-y-6">
            <ToastContainer position="top-right" autoClose={3000} />

            {posts.length === 0 ? (
                <div className="text-center text-gray-500 text-lg font-medium mt-10">
                    No posts yet 💤
                </div>
            ) : (posts.map((post, idx) => (
                <div key={idx} className="bg-white shadow-md rounded-lg p-4 space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-3">
                            <img src={`https://i.pravatar.cc/150?u=${post.userId}`} alt="User" className="w-10 h-10 rounded-full" />
                            <div>
                                <div className="font-semibold text-gray-800">{post.userId}</div>
                                <div className="text-sm text-gray-500">Skill Share</div>
                            </div>
                        </div>
                        <div className="flex space-x-2 mt-2">
                            {editingPostId === post.id ? (
                                <button onClick={() => handleSaveClick(post.id)} className="flex items-center px-4 py-2 bg-white border border-green-500 text-green-500 rounded hover:bg-green-50 transition font-semibold">
                                    Save
                                </button>
                            ) : (
                                <>
                                    <button onClick={() => handleEditClick(post)} className="flex items-center px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => confirmDelete(post.id)} className="flex items-center px-4 py-2 bg-white border border-red-500 text-red-500 rounded hover:bg-red-50 transition">
                                        <FaTrash />
                                    </button>
                                </>
                            )}

                        </div>
                    </div>

                    {/* Media Section */}
                    <MediaGrid media={post.media} />

                    {/* Description */}
                    {editingPostId === post.id ? (
                        <textarea
                            className="w-full border rounded p-2 text-gray-800"
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                        />
                    ) : (
                        <p className="text-gray-700">{post.description}</p>
                    )}
                </div>
            )))}

            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Are you sure you want to delete this post?</h2>
                        <div className="flex justify-center space-x-4 mt-4">
                            <button
                                onClick={handleDeleteConfirmed}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShowUserPosts;