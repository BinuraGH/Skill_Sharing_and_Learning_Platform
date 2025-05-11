import React from "react";

// Child component to display a single update
const ProgressUpdateItem = ({ update, onDelete }) => {
  return (
    <div className="border rounded-xl p-4 mb-4 shadow">
      <h2 className="text-xl font-bold mb-1">{update.title}</h2>
      <p className="text-sm text-gray-500 mb-1">Status: {update.status}</p>
      <p className="mb-2">{update.description}</p>
      <img
        src={update.imgLink}
        alt={update.title}
        className="w-full h-auto rounded-lg mb-2"
      />
      <p className="text-xs text-gray-400 mb-4">Date: {update.date}</p>

      <div className="btn-group">
        <button
          onClick={() => onDelete(update.id)}
          className="btn danger"
        >
          Delete
        </button>
        <button className="btn">Edit</button>
      </div>
    </div>
  );
};

// Parent component to display list of updates
const ProgressUpdateList = () => {
  const updates = [
    {
      id: "001",
      status: "Completed",
      title: "Getting Started with Express.js",
      description: "Just finished the official React hooks tutorial",
      imgLink: "https://example.com/images/express1.jpg",
      date: "5/01/2025"
    },
    {
      id: "002",
      status: "Incompleted",
      title: "Learning MongoDB Basics",
      description: "Currently exploring MongoDB queries and CRUD operations.",
      imgLink: "https://example.com/images/mongodb1.jpg",
      date: "5/05/2025"
    },
    {
      id: "003",
      status: "Completed",
      title: "Introduction to Mongoose",
      description: "Planning to start learning how to integrate MongoDB with Node.js using Mongoose.",
      imgLink: "https://example.com/images/mongoose1.jpg",
      date: "5/07/2025"
    }
  ];

  const handleDelete = (id) => {
    console.log("Delete update with id:", id);
    // Actual deletion logic (like API call or state update) goes here
  };

  return (
    <div className="p-4 bg-red-50 min-h-screen">
      {updates.map((update) => (
        <ProgressUpdateItem
          key={update.id}
          update={update}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ProgressUpdateList;
