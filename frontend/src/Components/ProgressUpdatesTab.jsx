import React, { useState } from "react";
import LearningProgressForm from "../Components/LearningProgressForm";

const ProgressUpdatesTab = () => {
  const [showForm, setShowForm] = useState(false);

  const dummyUpdates = [
    { id: 1, title: "Completed React Basics", date: "2025-05-01", note: "Finished first 3 lessons." },
    { id: 2, title: "Watched HTML Course", date: "2025-05-03", note: "Done with styling basics." },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-gray-800">Progress Updates</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full shadow-lg transition duration-200"
        >
          {showForm ? "Close Form" : "📌 Add Update"}
        </button>
      </div>

      {/* Modal Overlay */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl transition duration-150"
              aria-label="Close Modal"
            >
              &times;
            </button>

            <div className="px-6 py-8 overflow-y-auto max-h-[90vh]">
         
              <LearningProgressForm />
            </div>
          </div>
        </div>
      )}

      {/* Update Cards */}
      <ul className="space-y-4">
        {dummyUpdates.map(update => (
          <li
            key={update.id}
            className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition"
          >
            <h4 className="text-xl font-semibold text-purple-700 mb-1">{update.title}</h4>
            <p className="text-sm text-gray-500">{update.date}</p>
            <p className="mt-2 text-gray-700">{update.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressUpdatesTab;
