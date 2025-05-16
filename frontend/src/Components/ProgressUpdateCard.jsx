import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmojiReactions from "./EmojiReactions";

const ProgressUpdateCard = ({ update, onEdit, onDelete, showActions = true }) => {
  const navigate = useNavigate();
  const [reaction, setReaction] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false); // 🔍 Modal state

  if (!update) return null;

  const {
    _id,
    title,
    caption,
    status,
    imgLink = [],
  } = update;

  const firstImage =
    imgLink.length > 0
      ? imgLink[0]
      : "https://via.placeholder.com/280x160.png?text=No+Image";

  const handleCardClick = (e) => {
    if (
      e.target.closest(".edit-btn") ||
      e.target.closest(".delete-btn") ||
      e.target.closest(".emoji-wrapper") ||
      e.target.closest(".modal")
    )
      return;
    navigate(`/progress/${_id}`);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="w-full max-w-xs bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 border border-gray-200 cursor-pointer flex flex-col justify-between"
      >
        <img
          src={firstImage}
          alt={title || "Progress Update"}
          className="w-full h-40 object-cover bg-gray-100 border-b border-gray-200"
        />

        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {title || "Untitled Update"}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {status}
            </span>
          </div>

          <p className="text-sm text-gray-600">{caption || "No caption provided."}</p>

          {imgLink.length > 1 && (
            <div className="flex gap-1 overflow-x-auto py-2">
              {imgLink.slice(1).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Update ${idx + 1}`}
                  className="h-12 w-12 object-cover rounded"
                />
              ))}
            </div>
          )}

          <div className="pt-4">
            {showActions ? (
              <div className="flex gap-2">
                <button
                  className="edit-btn flex-1 text-blue-600 border border-blue-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-50 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(update);
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  className="delete-btn flex-1 text-red-600 border border-red-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-50 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowConfirm(true); // 🔍 Trigger modal
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            ) : (
              <div
                className="emoji-wrapper mt-2"
                onClick={(e) => e.stopPropagation()}
              >
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

      {/* 🔍 Confirmation Modal */}
      {showConfirm && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Confirm Deletion
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this progress update? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => {
                  onDelete(_id); // ✅ Calls your provided handleDelete
                  setShowConfirm(false);
                }}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressUpdateCard;