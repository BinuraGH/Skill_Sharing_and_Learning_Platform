import React from 'react';
import '../styles/ModalForm.css';

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
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Top-right X icon */}
        <button className="modal-close" onClick={onCancel} title="Close">×</button>

        <h3>{isEditing ? 'Update Plan' : 'Create Plan'}</h3>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}>
        <div className="user-load-wrapper">
          <input
            name="userId"
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            placeholder="User ID"
            aria-label="User ID"
            required
          />
          <button
            type="button"
            onClick={() => onLoadPlans(formData.userId)}
            className="load-plans-btn"
          >
            🔄 Load My Plans
          </button>
        </div>

          <input
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Plan Title"
            aria-label="Plan Title"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Short Description"
            rows={2}
          />

          <input
            name="thumbnailUrl"
            value={formData.thumbnailUrl}
            onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
            placeholder="Thumbnail URL"
          />

          <textarea
            name="courseDescription"
            value={formData.courseDescription}
            onChange={(e) => setFormData({ ...formData, courseDescription: e.target.value })}
            placeholder="Course Description"
            rows={3}
          />

          <h4>Topics</h4>
          {formData.topics.map((topic, index) => (
            <div key={index} className="topic-box">
              <input
                type="text"
                placeholder="Topic Title"
                value={topic.title}
                onChange={(e) => updateTopic(index, 'title', e.target.value)}
              />
              <input
                type="text"
                placeholder="Description"
                value={topic.description}
                onChange={(e) => updateTopic(index, 'description', e.target.value)}
              />
              <input
                type="text"
                placeholder="Video URL"
                value={topic.videoUrl}
                onChange={(e) => updateTopic(index, 'videoUrl', e.target.value)}
              />
              <button
                type="button"
                className="remove-topic-btn"
                onClick={() => removeTopic(index)}
                disabled={formData.topics.length === 1}
              >
                🗑 Remove
              </button>

            </div>
          ))}

          <button
            type="button"
            className="add-topic-btn"
            onClick={() =>
              setFormData({
                ...formData,
                topics: [...formData.topics, { title: '', description: '', completed: false, videoUrl: '' }],
              })
            }
          >
            ➕ Add Topic
          </button>

          <div className="modal-actions">
            <button className="create-btn" type="submit">
              {isEditing ? 'Update' : 'Create'}
            </button>
            <button type="button" className="cancel-btn" onClick={onCancel}>
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LearningPlanForm;
