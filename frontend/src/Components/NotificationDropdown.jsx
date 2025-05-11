import React from 'react';

const NotificationDropdown = ({ notifications }) => {
  return (
    <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl z-50 animate-fade-slide border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b bg-gray-50 font-semibold text-gray-800">
        Notifications
      </div>

      <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <li key={n.id} className="flex items-start px-4 py-3 hover:bg-gray-50 transition">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                {n.message[0]}
              </div>
              <div className="ml-3 text-sm">
                <p className="text-gray-700">{n.message}</p>
                <p className="text-gray-400 text-xs mt-1">{n.time}</p>
              </div>
            </li>
          ))
        ) : (
          <li className="px-4 py-6 text-center text-gray-500 text-sm">
            No new notifications
          </li>
        )}
      </ul>

      <div className="border-t bg-gray-50 text-sm text-center text-purple-600 hover:text-purple-800 hover:bg-gray-100 transition px-4 py-2 cursor-pointer">
        View all
      </div>
    </div>
  );
};

export default NotificationDropdown;
