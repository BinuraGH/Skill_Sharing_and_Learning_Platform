// src/components/tabs/ProgressUpdatesTab.jsx
import React from "react";

const ProgressUpdatesTab = () => {
  const dummyUpdates = [
    { id: 1, title: "Completed React Basics", date: "2025-05-01", note: "Finished first 3 lessons." },
    { id: 2, title: "Watched HTML Course", date: "2025-05-03", note: "Done with styling basics." },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">Progress Updates</h3>
      <ul className="space-y-4">
        {dummyUpdates.map(update => (
          <li key={update.id} className="bg-white rounded-lg shadow p-4">
            <h4 className="text-md font-bold text-purple-700">{update.title}</h4>
            <p className="text-sm text-gray-500">{update.date}</p>
            <p className="mt-1 text-gray-600">{update.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressUpdatesTab;
