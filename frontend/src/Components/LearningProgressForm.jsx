// Components/LearningProgressForm.jsx
import { useState, useEffect } from 'react';

const LearningProgressForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    status: 'Draft',
    imgLink: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        caption: initialData.caption || '',
        status: initialData.status || 'Draft',
        imgLink: (initialData.imgLink || []).join(', ')
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const progressUpdate = {
      ...formData,
      imgLink: formData.imgLink
        .split(',')
        .map((link) => link.trim())
        .filter(Boolean)
    };
    onSubmit(progressUpdate);
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">
        {initialData ? 'Edit Progress Update' : 'Create Progress Update'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Caption</label>
          <textarea
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            placeholder="Enter a caption"
            rows={4}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Draft">Draft</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Image Links (comma separated)</label>
          <input
            type="text"
            name="imgLink"
            value={formData.imgLink}
            onChange={handleChange}
            placeholder="https://img1.com, https://img2.com"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {initialData ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LearningProgressForm;