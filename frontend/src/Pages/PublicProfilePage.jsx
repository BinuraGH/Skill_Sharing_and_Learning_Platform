import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ShowUserPosts from './ShowUserPosts';
import Navbar from '../Components/Navbar';

const PublicProfilePage = () => {
    const { userId } = useParams();
    const [profileUser, setProfileUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const meRes = await axios.get('http://localhost:8080/api/auth/me', {
                    withCredentials: true
                });
                setCurrentUser(meRes.data);

                const userRes = await axios.get(`http://localhost:8080/api/auth/user/${userId}`);
                setProfileUser(userRes.data);

                const followRes = await axios.get(`http://localhost:8080/api/follow/${meRes.data.id}/following`);
                const followedIds = followRes.data.map(f => f.followedId);
                setIsFollowing(followedIds.includes(userId));

                // Fetch that user's follower/following list
                const followerRes = await axios.get(`http://localhost:8080/api/follow/${userId}/followers`);
                setFollowers(followerRes.data);

                const followingRes = await axios.get(`http://localhost:8080/api/follow/${userId}/following`);
                setFollowing(followingRes.data);
            } catch (err) {
                console.error('Error loading user data:', err);
            }
        };

        fetchUserData();
    }, [userId]);


    const handleToggleFollow = async () => {
        if (!currentUser?.id) return;

        try {
            if (isFollowing) {
                await axios.delete(`http://localhost:8080/api/follow?followerId=${currentUser.id}&followedId=${userId}`);
                setIsFollowing(false);
            } else {
                await axios.post(`http://localhost:8080/api/follow?followerId=${currentUser.id}&followedId=${userId}`);
                setIsFollowing(true);
            }
        } catch (err) {
            console.error("Follow/unfollow error:", err);
        }
    };

    if (!profileUser) return <div className="p-6 text-center">Loading profile...</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="w-full h-40 bg-gradient-to-r from-purple-400 to-indigo-500"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-16">
                <div className="bg-white rounded-xl shadow p-6 text-center">
                    <img
                        src={profileUser.profilePicture || '/default-avatar.png'}
                        alt="Profile"
                        className="w-28 h-28 rounded-full border-4 border-white -mt-16 mx-auto shadow-md"
                    />
                    <h2 className="text-xl font-bold mt-2">{profileUser.name}</h2>
                    <p className="text-gray-500">{profileUser.email}</p>
                    <div className="mt-3 font-medium text-sm text-gray-700">
                        <span className="mr-4">{followers.length} followers</span>
                        <span>{following.length} following</span>
                    </div>

                    {/* Follow Button */}
                    {currentUser?.id !== userId && (
                        <button
                            onClick={handleToggleFollow}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            className={`mt-4 px-4 py-1.5 text-sm rounded font-medium transition 
                ${isFollowing
                                    ? hovered
                                        ? 'bg-red-100 text-red-600 border border-red-300'
                                        : 'bg-gray-200 text-gray-800'
                                    : 'bg-purple-600 text-white hover:bg-purple-700'}
              `}
                        >
                            {isFollowing ? (hovered ? 'Unfollow' : 'Following') : 'Follow'}
                        </button>
                    )}
                </div>

                {/* Posts */}
                <div className="mt-8">
                    <ShowUserPosts userId={profileUser.id} />
                </div>
            </div>
        </div>
    );
};

export default PublicProfilePage;
