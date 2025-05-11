import { useState } from 'react';

const LearningProgressForm = () => {
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [status, setStatus] = useState('Draft');
  const [imgLink, setImgLink] = useState('');

  const handleCreate = async () => {
    const progressUpdate = {
      userId,
      title,
      status,
      caption,
      imgLink: imgLink.split(',').map(link => link.trim()),
      likedBy: [],
    };

    try {
      const response = await fetch('http://localhost:8080/api/progressupdates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressUpdate),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Successfully created progress update:', data);
      alert('Progress update created successfully!');
    } catch (error) {
      console.error('Failed to create progress update:', error);
      alert('Failed to create progress update.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl">
        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create Progress Update</h3>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your user ID"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Enter a caption"
              rows={4}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Draft">Draft</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Image Links</label>
            <input
              type="text"
              value={imgLink}
              onChange={(e) => setImgLink(e.target.value)}
              placeholder="https://img1.com, https://img2.com"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create
          </button>
          <button
            onClick={() => {
              setUserId('');
              setTitle('');
              setCaption('');
              setStatus('Draft');
              setImgLink('');
            }}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningProgressForm;
