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

  const addTopic = () => {
    setFormData({
      ...formData,
      topics: [
        ...formData.topics,
        { title: '', description: '', completed: false, videoUrl: '' },
      ],
    });
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
          {/* User ID + Load Button */}
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

          {/* Plan Fields */}
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

          {/* Paid Course Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPaid"
              checked={formData.isPaid}
              onChange={(e) => setFormData({ ...formData, isPaid: e.target.checked })}
            />
            <label htmlFor="isPaid" className="text-sm font-medium text-gray-700">
              Paid Course
            </label>
          </div>

          {/* Price Field */}
          {formData.isPaid && (
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Price (LKR)"
              className="w-full border p-2 rounded-md"
              min="0"
              required
            />
          )}

          {/* Topics */}
          <div>
            <h4 className="font-semibold mb-2">Topics</h4>
            {formData.topics.map((topic, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-md p-3 mb-4 space-y-2"
              >
                <input
                  type="text"
                  placeholder="Topic Title"
                  value={topic.title}
                  onChange={(e) => updateTopic(index, 'title', e.target.value)}
                  className="w-full border p-2 rounded-md"
                  required
                />
                <textarea
                  placeholder="Topic Description"
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
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={topic.completed}
                    onChange={(e) => updateTopic(index, 'completed', e.target.checked)}
                  />
                  <span className="text-sm">Completed</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeTopic(index)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove Topic
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTopic}
              className="text-sm text-purple-600 hover:underline"
            >
              + Add Topic
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
            >
              {isEditing ? 'Update Plan' : 'Create Plan'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LearningPlanForm;
