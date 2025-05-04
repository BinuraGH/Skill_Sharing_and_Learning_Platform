import React, { useState, useEffect } from 'react';
import './MyLearningPlans.css'; // optional for separate styles
import axios from 'axios';

const MyLearningPlans = () => {
  const [plans, setPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topicText, setTopicText] = useState('');

  // Fetch existing plans on load
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/plans'); // Update with your backend URL
      setPlans(res.data);
    } catch (err) {
      console.error('Error fetching plans:', err);
    }
  };

  const handleCreatePlan = async () => {
    const topics = topicText.split('\n').filter(Boolean).map(step => ({
      title: step,
      description: '',
      completed: false,
      videoUrl: ''
    }));

    const newPlan = {
      userId: 'demo-user', // Replace with actual user ID when ready
      title,
      description,
      status: 'In Progress',
      isPaid: false,
      price: 0,
      thumbnailUrl: '',
      courseDescription: '',
      topics
    };

    try {
      const res = await axios.post('http://localhost:8080/api/plans', newPlan);
      setPlans([...plans, res.data]);
      setShowForm(false);
      setTitle('');
      setDescription('');
      setTopicText('');
    } catch (err) {
      console.error('Error creating plan:', err);
    }
  };

  return (
    <div className="manage-learning">
      <h2>Manage Your Learning</h2>

      <div className="plan-tabs">
        <button className="active-tab">Learning Plans</button>
        <button>Progress Updates</button>
      </div>

      <div className="plans-info">
        <h4>Learning Plans</h4>
        <p>Create and manage your learning plans. These appear in the "Plans" tab of your profile.</p>
        <button onClick={() => setShowForm(!showForm)} className="new-plan-btn">
          {showForm ? 'Cancel' : '📌 New Plan'}
        </button>
      </div>

      {showForm && (
        <div className="create-form">
          <h4>Create Plan</h4>
          <input
            type="text"
            placeholder="Plan Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Short description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <textarea
            placeholder="One plan step per line"
            value={topicText}
            onChange={e => setTopicText(e.target.value)}
          />
          <button onClick={handleCreatePlan} className="create-btn">Create</button>
        </div>
      )}

      {plans.map((plan, idx) => (
        <div className="plan-card" key={idx}>
          <h3>{plan.title}</h3>
          <p>{plan.description}</p>
          <ul>
            {plan.topics?.slice(0, 4).map((topic, i) => (
              <li key={i}>{topic.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyLearningPlans;
