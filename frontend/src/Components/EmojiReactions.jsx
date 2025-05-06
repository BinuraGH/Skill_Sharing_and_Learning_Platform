import React, { useState, useRef, useEffect } from "react";

const reactions = ["👍", "❤️", "🎉"];

const EmojiReactions = ({ onReact }) => {
  const [selected, setSelected] = useState(null);
  const [showBar, setShowBar] = useState(false);
  const containerRef = useRef();

  const handleEmojiClick = (emoji) => {
    setSelected(emoji);
    setShowBar(false);
    onReact?.(emoji); // if passed
  };

  // Close if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        onClick={() => setShowBar(!showBar)}
        className="emoji-btn bg-gray-100 p-2 rounded-full hover:bg-gray-200"
      >
        {selected || "👍"}
      </button>

      {showBar && (
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 flex gap-2 bg-white shadow border p-2 rounded-xl z-10">
          {reactions.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleEmojiClick(emoji)}
              className={`text-xl hover:scale-110 transition-transform ${
                selected === emoji ? "ring-2 ring-blue-400 rounded" : ""
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmojiReactions;
