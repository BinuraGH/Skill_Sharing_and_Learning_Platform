import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaPhotoVideo } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SkillShare = () => {
    const [comment, setComment] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [description, setDescription] = useState("");
    const [mediaFiles, setMediaFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    const userId = "user123"; // Replace with actual user ID

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
        formData.append("userId", userId);
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
            fetchPosts(); // Refresh posts
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
            setPosts(res.data.reverse()); // show latest first
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
        <div className="max-w-3xl mx-auto p-4 space-y-6">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Post creation */}
            <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
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

            {/* Shared Posts */}
            {posts.length === 0 ? (
                <div className="text-center text-gray-500 text-lg font-medium mt-10">
                    No posts yet 💤
                </div>
            ) : (
                posts.map((post, idx) => (
                    <div key={idx} className="bg-white shadow-md rounded-lg p-4 space-y-4">
                        {/* Header */}
                        <div className="flex items-center space-x-3">
                            <img src={`https://i.pravatar.cc/150?u=${post.userId}`} alt="User" className="w-10 h-10 rounded-full" />
                            <div>
                                <div className="font-semibold text-gray-800">{post.userId}</div>
                                <div className="text-sm text-gray-500">Skill Share</div>
                                <div className="text-xs text-gray-500">{timeAgo(post.dateTime)}</div>
                            </div>
                        </div>

                        {/* Media Section */}
                        <MediaGrid media={post.media} />

                        {/* Description */}
                        <p className="text-gray-700">{post.description}</p>

                        {/* Reactions */}
                        <div className="flex space-x-4 text-gray-500 text-sm">
                            <span>💬 0 comments</span>
                            <span>❤️ 0 likes</span>
                        </div>

                        {/* Comment Box */}
                        <div className="flex space-x-2 mt-2">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="flex-1 border border-gray-300 rounded px-3 py-2"
                            />
                            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">Reply</button>
                        </div>
                    </div>
                )))}
        </div>
    );
};

export default SkillShare;
