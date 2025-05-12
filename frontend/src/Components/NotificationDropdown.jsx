import React, { useState } from 'react';
import { FiUserPlus, FiMessageSquare } from 'react-icons/fi';

const NotificationDropdown = ({ notifications }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleNotifications = showAll ? notifications : notifications.slice(0, 5);

  return (
    <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl z-50 animate-fade-slide border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b bg-gray-50 font-semibold text-gray-800">
        Notifications
      </div>

      <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100">
        {visibleNotifications.length > 0 ? (
          visibleNotifications.map((n) => (
            <li
              key={n.id}
              className={`flex items-start px-4 py-3 transition ${
                !n.isRead ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'
              }`}
            >
              {/* Icon based on type */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  n.type === 'follow' ? 'bg-blue-500' : 'bg-purple-500'
                }`}
              >
                {n.type === 'follow' ? (
                  <FiUserPlus className="text-lg" />
                ) : (
                  <FiMessageSquare className="text-lg" />
                )}
              </div>

              {/* Message & Time */}
              <div className="ml-3 text-sm">
                <p className="text-gray-700">{n.message}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(n.timestamp).toLocaleString()}
                </p>
              </div>
            </li>
          ))
        ) : (
          <li className="px-4 py-6 text-center text-gray-500 text-sm">
            No new notifications
          </li>
        )}
      </ul>

      {notifications.length > 5 && (
        <div
          className="border-t bg-gray-50 text-sm text-center text-purple-600 hover:text-purple-800 hover:bg-gray-100 transition px-4 py-2 cursor-pointer"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? 'Show less' : 'View all'}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
