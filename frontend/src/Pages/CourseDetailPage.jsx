import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";

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
    try {
      await fetch(`http://localhost:8080/api/plans/${id}/topics/${index}/complete`, {
        method: 'PATCH',
      });

      const updatedTopics = [...plan.topics];
      updatedTopics[index].completed = true;

      const completedCount = updatedTopics.filter(topic => topic.completed).length;
      const newProgress = Math.round((completedCount / updatedTopics.length) * 100);

      setPlan(prev => ({ ...prev, topics: updatedTopics }));
      setProgress(newProgress);
    } catch (err) {
      console.error("❌ Error marking topic complete:", err);
    }
  };

  if (!plan || !plan.topics) {
    return (
      <>
        <Navbar />
        <div className="p-8 text-gray-600 text-center text-lg">Loading course details...</div>
      </>
    );
  }

  const {
    title,
    courseDescription,
    status,
    topics,
  } = plan;

  return (
    <>
      <Navbar />
      <div className="p-6 md:p-10 max-w-4xl mx-auto">

        {/* Title + Info */}
        <h1 className="text-3xl font-bold text-gray-800 mb-1">{title}</h1>
        <p className="text-sm text-gray-500 mb-4">{status}</p>
        <p className="text-gray-700 mb-4">{courseDescription || "No course description provided."}</p>

        {/* Progress Bar */}
        <div className="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden mb-2">
          <div
            className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 text-right mb-6">{progress}% completed</p>

        {/* Course Content */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Content</h2>

        <div className="space-y-6">
          {topics.map((topic, index) => (
            <div key={index} className="border rounded-lg bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{topic.title || "Untitled Topic"}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {topic.description || "No description available for this topic."}
              </p>

              {topic.videoUrl ? (
                <div className="mb-3">
                  <iframe
                    className="w-full h-56 rounded"
                    src={topic.videoUrl}
                    title={topic.title}
                    allowFullScreen
                  />
                </div>
              ) : (
                <p className="text-sm italic text-gray-400 mb-3">No video available.</p>
              )}

              <button
                onClick={() => handleMarkComplete(index)}
                className={`px-4 py-2 text-sm font-semibold rounded shadow-sm transition-all duration-200 ${
                  topic.completed
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={topic.completed}
              >
                {topic.completed ? "Completed" : "Mark as Completed"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;
