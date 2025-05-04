// import React, { useState } from 'react';
// import Navbar from '../Components/Navbar';
// import PlanCard from '../Components/PlanCard';
// import '../styles/ManagePlans.css';

// const ManagePlans = () => {
//   const [activeTab, setActiveTab] = useState('plans');
//   const [showForm, setShowForm] = useState(false);

//   const [plans, setPlans] = useState([
//     {
//       id: 1,
//       title: 'Frontend Developer Roadmap',
//       subtitle: 'From basic HTML to advanced React.js concepts.',
//       topics: [
//         'HTML/CSS basics',
//         'JavaScript ES6+',
//         'React fundamentals',
//         'State management',
//       ],
//     },
//   ]);

//   const [formData, setFormData] = useState({
//     userId: '',
//     title: '',
//     description: '',
//     status: 'In Progress',
//     isPaid: false,
//     price: '',
//     thumbnailUrl: '',
//     courseDescription: '',
//     topics: [
//       {
//         title: '',
//         description: '',
//         completed: false,
//         videoUrl: '',
//       },
//     ],
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const updateTopic = (index, key, value) => {
//     setFormData((prev) => {
//       const updatedTopics = [...prev.topics];
//       updatedTopics[index][key] = value;
//       return { ...prev, topics: updatedTopics };
//     });
//   };

//   const handleCreatePlan = (e) => {
//     e.preventDefault();
//     const newPlan = {
//       id: Date.now(),
//       ...formData,
//     };
//     setPlans((prev) => [newPlan, ...prev]);
//     setFormData({
//       userId: '',
//       title: '',
//       description: '',
//       status: 'In Progress',
//       isPaid: false,
//       price: '',
//       thumbnailUrl: '',
//       courseDescription: '',
//       topics: [
//         {
//           title: '',
//           description: '',
//           completed: false,
//           videoUrl: '',
//         },
//       ],
//     });
//     setShowForm(false);
//   };

//   const handleDeletePlan = (id) => {
//     if (window.confirm('Are you sure you want to delete this plan?')) {
//       setPlans(plans.filter((plan) => plan.id !== id));
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="manage-learning">
//         <h2 className="page-title">Manage Your Learning</h2>

//         <div className="tab-switcher-wrapper">
//           <div className="tab-switcher-box">
//             <button
//               className={activeTab === 'plans' ? 'active-tab-btn' : 'tab-btn'}
//               onClick={() => setActiveTab('plans')}
//             >
//               Learning Plans
//             </button>
//             <button
//               className={activeTab === 'progress' ? 'active-tab-btn' : 'tab-btn'}
//               onClick={() => setActiveTab('progress')}
//             >
//               Progress Updates
//             </button>
//           </div>
//         </div>

//         <div className="plans-info">
//           <div className="plans-info-header">
//             <div>
//               <h3>Learning Plans</h3>
//               <p>
//                 Create and manage your learning plans. These appear in the "Plans" tab of your profile.
//               </p>
//             </div>
//             <button className="new-plan-btn" onClick={() => setShowForm((prev) => !prev)}>
//               📌 New Plan
//             </button>
//           </div>
//         </div>

//         {showForm && (
//           <form className="create-form" onSubmit={handleCreatePlan}>
//             <input
//               name="userId"
//               value={formData.userId}
//               onChange={handleInputChange}
//               placeholder="User ID"
//               required
//             />
//             <input
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               placeholder="Plan Title"
//               required
//             />
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               placeholder="Short Description"
//               rows={2}
//             />
//             <select name="status" value={formData.status} onChange={handleInputChange}>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>

//             <div className="form-row checkbox-row">
//             <label className="checkbox-label">
//               <input
//                 type="checkbox"
//                 name="isPaid"
//                 checked={formData.isPaid}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, isPaid: e.target.checked }))
//                 }
//               />
//               <span>Paid Course</span>
//             </label>
//           </div>


//             {formData.isPaid && (
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleInputChange}
//                 placeholder="Price (USD)"
//                 required
//               />
//             )}

//             <input
//               name="thumbnailUrl"
//               value={formData.thumbnailUrl}
//               onChange={handleInputChange}
//               placeholder="Thumbnail Image URL"
//             />
//             <textarea
//               name="courseDescription"
//               value={formData.courseDescription}
//               onChange={handleInputChange}
//               placeholder="Detailed Course Description"
//               rows={3}
//             />

//             <h4 style={{ marginTop: '20px' }}>Topics</h4>
//             {formData.topics.map((topic, index) => (
//               <div key={index} className="topic-box">
//                 <input
//                   type="text"
//                   placeholder="Topic Title"
//                   value={topic.title}
//                   onChange={(e) => updateTopic(index, 'title', e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Description"
//                   value={topic.description}
//                   onChange={(e) => updateTopic(index, 'description', e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Video URL"
//                   value={topic.videoUrl}
//                   onChange={(e) => updateTopic(index, 'videoUrl', e.target.value)}
//                 />
//                 <div className="form-row checkbox-row">
//                   <label className="checkbox-label">
//                     <input
//                       type="checkbox"
//                       checked={topic.completed}
//                       onChange={(e) => updateTopic(index, 'completed', e.target.checked)}
//                     />
//                     <span>Completed</span>
//                   </label>
//                 </div>

//               </div>
//             ))}

//             <button
//               type="button"
//               onClick={() =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   topics: [
//                     ...prev.topics,
//                     { title: '', description: '', completed: false, videoUrl: '' },
//                   ],
//                 }))
//               }
//             >
//               ➕ Add Topic
//             </button>

//             <button className="create-btn" type="submit">
//               Create Plan
//             </button>
//           </form>
//         )}

//         <h3>Learning Plans</h3>
//         {plans.map((plan) => (
//           <PlanCard key={plan.id} plan={plan} onDelete={() => handleDeletePlan(plan.id)} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default ManagePlans;
// src/Pages/ManagePlans.jsx

import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import PlanCard from '../Components/PlanCard';
import '../styles/ManagePlans.css';

const ManagePlans = () => {
  const [activeTab, setActiveTab] = useState('plans');
  const [showForm, setShowForm] = useState(false);
  const [plans, setPlans] = useState([]);
  const [isEditing, setIsEditing] = useState(false);


  const [formData, setFormData] = useState({
    userId: '',
    title: '',
    description: '',
    status: 'In Progress',
    isPaid: false,
    price: '',
    thumbnailUrl: '',
    courseDescription: '',
    topics: [
      {
        title: '',
        description: '',
        completed: false,
        videoUrl: '',
      },
    ],
  });

  // 🛜 Fetch Plans Dynamically Based on User ID
  const fetchPlans = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/plans/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch plans');
      }
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'price') {
      const numericValue = parseFloat(value);
      const isPaid = numericValue > 0;
      setFormData((prev) => ({
        ...prev,
        price: value,
        isPaid,
      }));
      return;
    }
  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const updateTopic = (index, key, value) => {
    setFormData((prev) => {
      const updatedTopics = [...prev.topics];
      updatedTopics[index][key] = value;
      return { ...prev, topics: updatedTopics };
    });
  };

  const removeTopic = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    const userId = formData.userId;

    const newPlan = {
      userId,
      title: formData.title,
      description: formData.description,
      isPaid: formData.isPaid,
      price: formData.isPaid ? parseFloat(formData.price) || 0.0 : 0.0,
      thumbnailUrl: formData.thumbnailUrl,
      courseDescription: formData.courseDescription,
      topics: formData.topics,
    };

    try {
      const response = await fetch('http://localhost:8080/api/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlan),
      });

      if (!response.ok) {
        throw new Error('Failed to create the plan');
      }

      const savedPlan = await response.json();
      setPlans((prev) => [savedPlan, ...prev]);
      alert('Plan created successfully!');

      setFormData({
        userId: '',
        title: '',
        description: '',
        status: 'In Progress',
        isPaid: false,
        price: '',
        thumbnailUrl: '',
        courseDescription: '',
        topics: [
          {
            title: '',
            description: '',
            completed: false,
            videoUrl: '',
          },
        ],
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error creating plan:', error);
      alert('Failed to create plan. Please try again.');
    }
  };

  const handleEditPlan = (plan) => {
    setFormData({
      userId: plan.userId,
      title: plan.title,
      description: plan.description,
      status: plan.status,
      isPaid: plan.isPaid,
      price: plan.price,
      thumbnailUrl: plan.thumbnailUrl,
      courseDescription: plan.courseDescription,
      topics: plan.topics,
      updatedPlanId: plan._id, // important
    });
    setIsEditing(true);  // ✅ Switch to editing mode
    setShowForm(true);    // ✅ Open the form
  };
  
  const handleUpdatePlan = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:8080/api/plans/${formData.updatedPlanId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          thumbnailUrl: formData.thumbnailUrl,
          courseDescription: formData.courseDescription,
          isPaid: formData.isPaid,
          price: formData.isPaid ? parseFloat(formData.price) || 0.0 : 0.0,
          topics: formData.topics,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update plan');
      }
  
      const updatedPlan = await response.json();
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan._id === updatedPlan._id ? updatedPlan : plan
        )
      );
      alert('Plan updated successfully!');
  
      // Reset form after update
      setFormData({
        userId: '',
        title: '',
        description: '',
        status: 'In Progress',
        isPaid: false,
        price: '',
        thumbnailUrl: '',
        courseDescription: '',
        topics: [
          { title: '', description: '', completed: false, videoUrl: '' },
        ],
      });
      setIsEditing(false); // ✅ back to create mode
      setShowForm(false);
    } catch (error) {
      console.error('Error updating plan:', error);
      alert('Failed to update plan. Please try again.');
    }
  };
  

  const handleDeletePlan = async (planId, userId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/plans/${planId}?requestingUserId=${userId}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete the plan');
        }
  
        // Filter out the deleted plan from local state
        setPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== planId));
        alert('Plan deleted successfully!');
      } catch (error) {
        console.error('Error deleting plan:', error);
        alert('Failed to delete plan.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="manage-learning">
        <h2 className="page-title">Manage Your Learning</h2>

        <div className="tab-switcher-wrapper">
          <div className="tab-switcher-box">
            <button className={activeTab === 'plans' ? 'active-tab-btn' : 'tab-btn'} onClick={() => setActiveTab('plans')}>
              Learning Plans
            </button>
            <button className={activeTab === 'progress' ? 'active-tab-btn' : 'tab-btn'} onClick={() => setActiveTab('progress')}>
              Progress Updates
            </button>
          </div>
        </div>

        <div className="plans-info">
          <div className="plans-info-header">
            <div>
              <h3>Learning Plans</h3>
              <p>Create and manage your learning plans. These appear in the "Plans" tab of your profile.</p>
            </div>
            <button className="new-plan-btn" onClick={() => setShowForm((prev) => !prev)}>
              📌 New Plan
            </button>
          </div>
        </div>

        {showForm && (
          <form className="create-form" onSubmit={isEditing ? handleUpdatePlan : handleCreatePlan}>
          <input
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              placeholder="User ID"
              required
            />
            {/* 🔄 Load Plans Button */}
            <button
              type="button"
              onClick={() => fetchPlans(formData.userId)}
              className="load-plans-btn"
            >
              🔄 Load My Plans
            </button>

            <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Plan Title" required />
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Short Description" rows={2} />

            <div className="form-row checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isPaid"
                  checked={formData.isPaid}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isPaid: e.target.checked }))}
                />
                <span>Paid Course</span>
              </label>
            </div>

            {formData.isPaid && (
              <div className="form-row">
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price (USD)" required />
              </div>
            )}

            <input name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleInputChange} placeholder="Thumbnail Image URL" />
            <textarea name="courseDescription" value={formData.courseDescription} onChange={handleInputChange} placeholder="Detailed Course Description" rows={3} />

            <h4 style={{ marginTop: '20px' }}>Topics</h4>
            {formData.topics.map((topic, index) => (
              <div key={index} className="topic-box">
                <input type="text" placeholder="Topic Title" value={topic.title} onChange={(e) => updateTopic(index, 'title', e.target.value)} />
                <input type="text" placeholder="Description" value={topic.description} onChange={(e) => updateTopic(index, 'description', e.target.value)} />
                <input type="text" placeholder="Video URL" value={topic.videoUrl} onChange={(e) => updateTopic(index, 'videoUrl', e.target.value)} />
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
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  topics: [...prev.topics, { title: '', description: '', completed: false, videoUrl: '' }],
                }))
              }
            >
              ➕ Add Topic
            </button>

            <button className="create-btn" type="submit">
              {isEditing ? 'Update Plan' : 'Create Plan'}
            </button>

          </form>
        )}

        <h3>Learning Plans</h3>
        {plans.map((plan) => (
          <PlanCard 
            key={plan._id} 
            plan={plan} 
            onDelete={() => handleDeletePlan(plan._id, plan.userId)} 
            onEdit={(plan) => handleEditPlan(plan)}  
            />
        ))}

      </div>
    </>
  );
};

export default ManagePlans;
