import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetailPage.css';


const CourseDetailPage = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/plans/${id}/progress`);
        const data = await res.json();
        setPlan(data);
        setProgress(data.progressPercentage);
      } catch (err) {
        console.error("❌ Error loading plan details:", err);
      }
    };

    fetchPlan();
  }, [id]);

  const handleMarkComplete = async (index) => {
    await fetch(`http://localhost:8080/api/plans/${id}/topics/${index}/complete`, {
      method: 'PATCH',
    });

    const res = await fetch(`http://localhost:8080/api/plans/${id}/progress`);
    const data = await res.json();
    setPlan(data);
    setProgress(data.progressPercentage);
  };

  if (!plan || !plan.topics) {
    return <div className="p-8 text-gray-600">Loading course details...</div>;
  }

  const {
    title,
    courseDescription,
    price,
    isPaid,
    status,
    topics,
    thumbnailUrl,
  } = plan;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <img
        src={thumbnailUrl || "https://via.placeholder.com/800x300.png?text=Course+Thumbnail"}
        alt={title}
        className="w-full h-64 object-cover rounded mb-4"
      />

      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-500 mb-2">
        {isPaid ? `$${price}` : "Free"} · {status}
      </p>
      <p className="mb-4 text-gray-700">{courseDescription || "No course description provided."}</p>

      <div className="bg-gray-200 h-3 rounded-full mb-2">
        <div className="bg-green-500 h-3 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-sm text-right text-gray-500 mb-6">{progress}% completed</p>

      <h2 className="text-xl font-semibold mb-3">Course Content</h2>

      <div className="space-y-4">
        {topics.map((topic, index) => (
          <div key={index} className="border rounded p-4 bg-white shadow">
            <h3 className="text-lg font-medium">{topic.title || "Untitled Topic"}</h3>
            <p className="text-sm text-gray-600">
              {topic.description || "No description available for this topic."}
            </p>

            {topic.videoUrl ? (
              <iframe
                width="100%"
                height="250"
                src={topic.videoUrl}
                title={topic.title}
                className="my-3"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="text-sm italic text-gray-400 my-2">No video available.</p>
            )}

            <button
              onClick={() => handleMarkComplete(index)}
              className={`px-4 py-2 text-white mt-2 rounded ${
                topic.completed ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              disabled={topic.completed}
            >
              {topic.completed ? "Completed" : "Mark as Completed"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetailPage;
