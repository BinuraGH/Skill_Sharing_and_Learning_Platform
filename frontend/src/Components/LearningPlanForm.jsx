import React from 'react';

const LearningPlanForm = ({
  formData,
  setFormData,
  isEditing,
  onSubmit,
  onCancel,
  onLoadPlans,
}) => {
  const updateTopic = (index, key, value) => {
    const updatedTopics = [...formData.topics];
    updatedTopics[index][key] = value;
    setFormData({ ...formData, topics: updatedTopics });
  };

  const removeTopic = (indexToRemove) => {
    const updatedTopics = formData.topics.filter((_, index) => index !== indexToRemove);
    setFormData({ ...formData, topics: updatedTopics });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-xl relative max-h-[90vh] overflow-y-auto border">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-red-500"
          title="Close"
        >
          ×
        </button>

        <h3 className="text-2xl font-bold mb-6">{isEditing ? 'Update Plan' : 'Create Plan'}</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
          className="space-y-5"
        >
          {/* User ID + Load Plans */}
          <div className="flex gap-3 items-center">
            <input
              name="userId"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              placeholder="User ID"
              className="flex-grow border border-gray-300 p-2 rounded-md"
              required
            />
            <button
              type="button"
              onClick={() => onLoadPlans(formData.userId)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              🔄 Load My Plans
            </button>
          </div>

          {/* Basic Info */}
          <input
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Plan Title"
            className="w-full border p-2 rounded-md"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Short Description"
            rows={2}
            className="w-full border p-2 rounded-md"
          />

          <input
            name="thumbnailUrl"
            value={formData.thumbnailUrl}
            onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
            placeholder="Thumbnail URL"
            className="w-full border p-2 rounded-md"
          />

          <textarea
            name="courseDescription"
            value={formData.courseDescription}
            onChange={(e) => setFormData({ ...formData, courseDescription: e.target.value })}
            placeholder="Course Description"
            rows={3}
            className="w-full border p-2 rounded-md"
          />

          {/* Topics Section */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Topics</h4>
            <div className="space-y-4">
              {formData.topics.map((topic, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded border space-y-2">
                  <input
                    type="text"
                    placeholder="Topic Title"
                    value={topic.title}
                    onChange={(e) => updateTopic(index, 'title', e.target.value)}
                    className="w-full border p-2 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={topic.description}
                    onChange={(e) => updateTopic(index, 'description', e.target.value)}
                    className="w-full border p-2 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Video URL"
                    value={topic.videoUrl}
                    onChange={(e) => updateTopic(index, 'videoUrl', e.target.value)}
                    className="w-full border p-2 rounded-md"
                  />
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800 text-sm"
                    onClick={() => removeTopic(index)}
                    disabled={formData.topics.length === 1}
                  >
                    🗑 Remove Topic
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add Topic Button */}
          <button
            type="button"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
            onClick={() =>
              setFormData({
                ...formData,
                topics: [...formData.topics, { title: '', description: '', completed: false, videoUrl: '' }],
              })
            }
          >
            ➕ Add Topic
          </button>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
            >
              {isEditing ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LearningPlanForm;
