import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { FaCheckCircle } from "react-icons/fa";

const CourseDetailPage = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);// Store full plan data
  const [progress, setProgress] = useState(0);// Track completion percentage
  const [loggedInUser, setLoggedInUser] = useState(null);// Store logged-in user


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch('http://localhost:8080/api/auth/me', {
          credentials: 'include',
        });
        const user = await userRes.json();
        setLoggedInUser(user);

        //Fetch plan + progress
        const planRes = await fetch(`http://localhost:8080/api/plans/${id}/progress`);
        const planData = await planRes.json();
        setPlan(planData);
        setProgress(planData.progressPercentage);// percent from backend
      } catch (err) {
        console.error("❌ Error loading data:", err);
      }
    };

    fetchData();
  }, [id]);

  //Mark a topic as complete
  const handleMarkComplete = async (index) => {
    try {
      await fetch(`http://localhost:8080/api/plans/${id}/topics/${index}/complete`, {
        method: 'PATCH',
      });
      // Update topic status in local state
      const updatedTopics = [...plan.topics];
      updatedTopics[index].completed = true;

      const completedCount = updatedTopics.filter(topic => topic.completed).length;
      const newProgress = Math.round((completedCount / updatedTopics.length) * 100);

      setPlan(prev => ({ ...prev, topics: updatedTopics }));
      setProgress(newProgress);

      // Send notification when course is completed
      if (newProgress === 100 && loggedInUser) {
        await fetch(`http://localhost:8080/api/notifications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: loggedInUser.id, // ✅ Send to the current user
            type: 'planComplete',
            message: `🎉 Congratulations! You've completed the "${plan.title}" learning plan.`,
          }),
        });
      }


    } catch (err) {
      console.error("❌ Error marking topic complete:", err);
    }
  };

  if (!plan) {
    return (
      <>
        <Navbar />
        <div className="p-8 text-center text-gray-600 text-lg">Loading course details...</div>
      </>
    );
  }

  const { title, courseDescription, status, topics } = plan;

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-1">{title}</h1>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="capitalize">Status: {status}</span>
            <span>{progress}% Completed</span>
          </div>

          <div className="relative w-full h-5 bg-gray-200 rounded-full mt-4 overflow-hidden">
            <div
              className={`
                h-full rounded-full transition-all duration-500
                ${progress < 50 ? 'bg-red-400' : progress < 80 ? 'bg-yellow-400' : 'bg-green-500'}
              `}
              style={{ width: `${progress}%` }}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-white">
              {progress}%
            </span>
          </div>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {courseDescription || "No course description provided."}
          </p>
        </div>

        {/* Course Content */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Course Content</h2>

          <div className="space-y-6">
            {topics.map((topic, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{topic.title || "Untitled Topic"}</h3>
                    <p className="text-sm text-gray-500">{topic.description || "No description available."}</p>
                  </div>
                  {topic.completed && (
                    <span className="inline-flex items-center text-green-600 font-medium text-sm">
                      <FaCheckCircle className="mr-1" /> Completed
                    </span>
                  )}
                </div>

                {topic.videoUrl ? (
                  <div className="overflow-hidden rounded-lg mb-4">
                    <iframe
                      src={topic.videoUrl}
                      title={topic.title}
                      allowFullScreen
                      className="w-full h-56 md:h-64 rounded-lg"
                    />
                  </div>
                ) : (
                  <p className="text-sm italic text-gray-400 mb-4">No video available.</p>
                )}

                {/*Mark Complete Button */}
                {!topic.completed && (
                  <button
                    onClick={() => handleMarkComplete(index)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default CourseDetailPage;
