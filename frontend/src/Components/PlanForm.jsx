import React, { useState } from 'react';

const PlanForm = ({ setPlans }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseDescription: '',
    isPaid: false,
    price: 0,
    topicsText: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    const topics = formData.topicsText.split('\n').map(step => ({
      title: step,
      description: '',
      videoUrl: '',
      completed: false
    }));

    const newPlan = {
      ...formData,
      topics,
      status: 'In Progress'
    };

    fetch('/api/plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlan)
    })
      .then(res => res.json())
      .then(savedPlan => {
        setPlans(prev => [savedPlan, ...prev]);
        setFormData({ title: '', description: '', courseDescription: '', isPaid: false, price: 0, topicsText: '' });
      });
  };

  return (
    <form className="plan-form" onSubmit={handleSubmit}>
      <h4>Create Plan</h4>
      <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Plan Title" required />
      <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Short description" />
      <textarea value={formData.courseDescription} onChange={e => setFormData({ ...formData, courseDescription: e.target.value })} placeholder="Course description" />
      <textarea value={formData.topicsText} onChange={e => setFormData({ ...formData, topicsText: e.target.value })} placeholder="One plan step per line" />
      <div className="row">
        <label><input type="checkbox" checked={formData.isPaid} onChange={e => setFormData({ ...formData, isPaid: e.target.checked })} /> Paid Plan</label>
        {formData.isPaid && (
          <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })} />
        )}
      </div>
      <div className="form-buttons">
        <button type="submit">Create</button>
        <button type="button" onClick={() => setFormData({ title: '', description: '', courseDescription: '', isPaid: false, price: 0, topicsText: '' })}>Cancel</button>
      </div>
    </form>
  );
};

export default PlanForm;
