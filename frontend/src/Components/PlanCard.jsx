import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmojiReactions from "../Components/EmojiReactions";

const PlanCard = ({ plan, onEdit, onDelete, showActions = true }) => {
  const navigate = useNavigate();
  const [reaction, setReaction] = useState(null);

  if (!plan) return null;

  const {
    _id = plan.id,
    title,
    description,
    thumbnailUrl,
    topics = [],
  } = plan;

  const planId = _id;

  const getYoutubeThumbnail = (url) => {
    try {
      const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
    } catch {
      return null;
    }
  };
  

  const firstVideoUrl = topics.length > 0 ? topics[0].videoUrl : null;
  const videoThumbnail = firstVideoUrl ? getYoutubeThumbnail(firstVideoUrl) : null;

  const imageToShow = videoThumbnail || (thumbnailUrl?.trim() || "https://via.placeholder.com/280x160.png?text=No+Image");

  const handleCardClick = (e) => {
    if (
      e.target.closest(".edit-btn") ||
      e.target.closest(".delete-btn") ||
      e.target.closest(".emoji-wrapper")
    ) return;
    navigate(`/plans/${planId}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full max-w-xs bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 border border-gray-200 cursor-pointer flex flex-col justify-between"
    >
      <img
        src={imageToShow}
        alt={title || "Course Thumbnail"}
        className="w-full h-40 object-cover bg-gray-100 border-b border-gray-200"
      />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{title || "Untitled Course"}</h3>
        <p className="text-sm text-gray-600">{description || "No description provided."}</p>

        {topics.length > 0 && (
          <ul className="list-disc pl-4 text-sm text-gray-700 space-y-1 max-h-20 overflow-hidden">
            {topics.slice(0, 3).map((topic, idx) => (
              <li key={`${planId}-topic-${idx}`} className="truncate">
                {topic.title || `Topic ${idx + 1}`}
              </li>
            ))}
          </ul>
        )}

        <div className="pt-4">
          {showActions ? (
            <div className="flex gap-2">
              <button
                className="edit-btn flex-1 text-blue-600 border border-blue-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-50 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(plan);
                }}
              >
                ✏️ Edit
              </button>
              <button
                className="delete-btn flex-1 text-red-600 border border-red-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-50 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(plan);
                }}
              >
                🗑 Delete
              </button>
            </div>
          ) : (
            <div className="emoji-wrapper mt-2" onClick={(e) => e.stopPropagation()}>
              <EmojiReactions reaction={reaction} setReaction={setReaction} />
            </div>
          )}
        </div>

        {!showActions && reaction && (
          <p className="text-sm text-center text-gray-500 mt-2">
            You reacted with <span className="text-lg">{reaction}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
