// Components/LearningProgressForm.jsx
import axios from 'axios';
import { useState, useEffect } from 'react';

const LearningProgressForm = ({ initialData, onCancel, onPostSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    status: 'Draft',
    imgLink: ''
  });
  const [user, setUser] = useState(null);

  // Populate form if editing
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

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/auth/me', {
          withCredentials: true,
        });
        setUser(res.data);
        console.log("👤 Logged-in User:", res.data);
      } catch (err) {
        console.error('❌ Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUpdate = {
      title: formData.title.trim(),
      caption: formData.caption.trim(),
      status: formData.status,
      imgLink: formData.imgLink
        .split(',')
        .map(link => link.trim())
        .filter(link => link !== ''),
      userId: user?.id,
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/progressupdates',
        newUpdate,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      console.log('✅ Progress update created:', response.data);

      if (onPostSuccess) onPostSuccess(response.data); // Pass back created data

    } catch (err) {
      console.error('❌ Failed to create progress update:', err);
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">
        Create Progress Update
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
            <option value="In Progress">In Progress</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Image Link (Optional)</label>
          <input
            type="text"
            name="imgLink"
            value={formData.imgLink}
            onChange={handleChange}
            placeholder="https://img1.com"
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default LearningProgressForm;
