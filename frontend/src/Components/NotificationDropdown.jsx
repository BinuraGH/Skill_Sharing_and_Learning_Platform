import React, { useState } from 'react';
import {
  FiUserPlus,
  FiMessageSquare,
  FiTrash2,
} from 'react-icons/fi';
import {
  FaHeart,
  FaThumbsUp,
  FaMedal,
  FaCheckCircle,
} from 'react-icons/fa';

const NotificationDropdown = ({ notifications, timeAgo, fetchNotifications }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleNotifications = showAll ? notifications : notifications.slice(0, 5);

  // Clear a Single Notification
  const clearNotification = async (id) => {
    await fetch(`http://localhost:8080/api/notifications/${id}`, {
      method: 'DELETE',
    });
    fetchNotifications();
  };

  //Clear All Notifications for the User
  const clearAll = async () => {
    if (!notifications[0]) return;
    const userId = notifications[0].userId;
    await fetch(`http://localhost:8080/api/notifications/user/${userId}/clear`, {
      method: 'DELETE',
    });
    fetchNotifications();
  };

  // Get Icon and Background Color based on Notification Type
  const getIcon = (n) => {
    if (n.type === 'follow') return <FiUserPlus className="text-lg" />;
    if (n.type === 'comment') return <FiMessageSquare className="text-lg" />;
    if (n.type === 'reaction') {
      if (n.reaction === 'heart') return <FaHeart className="text-lg" />;
      if (n.reaction === 'like') return <FaThumbsUp className="text-lg" />;
      if (n.reaction === 'celebrate') return <FaMedal className="text-lg" />;
    }
    if (n.type === 'planComplete') return <FaCheckCircle className="text-lg" />;
    return <FaMedal className="text-lg" />;
  };

  const getBgColor = (n) => {
    if (n.type === 'follow') return 'bg-blue-500';
    if (n.type === 'comment') return 'bg-purple-500';
    if (n.type === 'reaction') {
      if (n.reaction === 'like') return 'bg-blue-600';
      if (n.reaction === 'heart') return 'bg-red-500';
      if (n.reaction === 'celebrate') return 'bg-green-500';
    }
    if (n.type === 'planComplete') return 'bg-green-500';
    return 'bg-gray-500';
  };

  return (
    <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl z-50 animate-fade-slide border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50 font-semibold text-gray-800">
        <span>Notifications</span>
        <button
          className="text-sm text-red-500 hover:text-red-700"
          onClick={(e) => {
            e.stopPropagation();
            clearAll();
          }}
        >
          Clear all
        </button>
      </div>

      <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100">
        {visibleNotifications.length > 0 ? (
          visibleNotifications.map((n) => (
            <li
              key={n.id}
              className={`flex items-start px-4 py-3 transition relative ${
                !n.isRead ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'
              }`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white ${getBgColor(n)}`}
              >
                {getIcon(n)}
              </div>

              <div className="ml-3 text-sm pr-6">
                <p className="text-gray-700">{n.message}</p>
                <p className="text-gray-400 text-xs mt-1">{timeAgo(n.timestamp)}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearNotification(n.id);
                }}
                className="absolute top-3 right-4 text-gray-400 hover:text-red-500"
                title="Delete"
              >
                <FiTrash2 />
              </button>
            </li>
          ))
        ) : (
          <li className="px-4 py-6 text-center text-gray-500 text-sm">No new notifications</li>
        )}
      </ul>

      {notifications.length > 5 && (
        <div
          className="border-t bg-gray-50 text-sm text-center text-purple-600 hover:text-purple-800 hover:bg-gray-100 transition px-4 py-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowAll((prev) => !prev);
          }}
        >
          {showAll ? 'Show less' : 'View all'}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
