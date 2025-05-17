import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaChevronDown, FaChevronUp, FaPhotoVideo } from 'react-icons/fa';
import * as Yup from 'yup';

const SkillShareForm = ({ onPostSuccess }) => {
    const [user, setUser] = useState(null); // State to store logged-in user's data
    const [expanded, setExpanded] = useState(false);
    const [description, setDescription] = useState("");
    const [mediaFiles, setMediaFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});


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

    const toggleExpand = () => setExpanded(prev => !prev);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 3) {
            toast.warn("You can upload up to 3 media files.");
            return;
        }
        setMediaFiles(selectedFiles);
    };

    const postSchema = Yup.object().shape({
        description: Yup.string()
            .trim()
            .required('Description is required.')
            .min(10, 'Description must be at least 10 characters long.'),
        mediaFiles: Yup.array()
            .min(1, 'At least 1 media file is required.')
            .max(3, 'You can upload up to 3 media files.')
    });


    const handlePost = async () => {
        try {
            setErrors({}); // Clear previous errors

            await postSchema.validate({ description, mediaFiles }, { abortEarly: false });

            setIsLoading(true);
            const formData = new FormData();
            formData.append("userId", user?.id);
            formData.append("uname", user?.name);
            formData.append("description", description);
            mediaFiles.forEach(file => formData.append("media", file));

            await axios.post("http://localhost:8080/api/skill-sharing", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            toast.success("Post uploaded successfully!");
            setDescription("");
            setMediaFiles([]);
            setExpanded(false);
            if (onPostSuccess) onPostSuccess();
        } catch (error) {
            if (error.name === "ValidationError") {
                const newErrors = {};
                error.inner.forEach(err => {
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
            } else {
                toast.error("Failed to upload post.");
                console.error("Upload error:", error.response?.data || error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div><ToastContainer position="top-right" autoClose={3000} />
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
                            className="w-full border border-gray-300 rounded px-3 py-1 resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        {errors.description && <p style={{ marginTop: -5 }} className="text-red-500 text-sm-bold">{errors.description}</p>}

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
                            {errors.mediaFiles && <p className="text-red-500 text-sm-bold">{errors.mediaFiles}</p>}
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
        </div>
    )
}

export default SkillShareForm