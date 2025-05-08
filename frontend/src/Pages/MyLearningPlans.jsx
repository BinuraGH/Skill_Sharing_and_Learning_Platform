// import React, { useState } from 'react';
// import Navbar from '../Components/Navbar';
// import PlanCard from '../Components/PlanCard';
// import '../styles/Home.css'; // Use your preferred CSS path

// const MyLearningPlans = () => {
//   const [activeTab, setActiveTab] = useState('plans');
//   const [showForm, setShowForm] = useState(false);
//   const [plans, setPlans] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);

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

//   const fetchPlans = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/plans/user/${userId}`);
//       if (!response.ok) throw new Error('Failed to fetch plans');
//       const data = await response.json();
//       setPlans(data);
//     } catch (error) {
//       console.error('Error fetching plans:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'price') {
//       const isPaid = parseFloat(value) > 0;
//       setFormData((prev) => ({ ...prev, price: value, isPaid }));
//       return;
//     }
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const updateTopic = (index, key, value) => {
//     setFormData((prev) => {
//       const topics = [...prev.topics];
//       topics[index][key] = value;
//       return { ...prev, topics };
//     });
//   };

//   const removeTopic = (indexToRemove) => {
//     setFormData((prev) => ({
//       ...prev,
//       topics: prev.topics.filter((_, index) => index !== indexToRemove),
//     }));
//   };

//   const handleCreatePlan = async (e) => {
//     e.preventDefault();
//     const newPlan = {
//       userId: formData.userId,
//       title: formData.title,
//       description: formData.description,
//       isPaid: formData.isPaid,
//       price: formData.isPaid ? parseFloat(formData.price) || 0.0 : 0.0,
//       thumbnailUrl: formData.thumbnailUrl,
//       courseDescription: formData.courseDescription,
//       topics: formData.topics,
//     };

//     try {
//       const response = await fetch('http://localhost:8080/api/plans', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newPlan),
//       });
//       if (!response.ok) throw new Error('Failed to create the plan');
//       const savedPlan = await response.json();
//       setPlans((prev) => [savedPlan, ...prev]);
//       alert('Plan created successfully!');
//       resetForm();
//     } catch (error) {
//       console.error('Error creating plan:', error);
//       alert('Failed to create plan.');
//     }
//   };

//   const handleEditPlan = (plan) => {
//     setFormData({
//       userId: plan.userId,
//       title: plan.title,
//       description: plan.description,
//       status: plan.status,
//       isPaid: plan.isPaid,
//       price: plan.price,
//       thumbnailUrl: plan.thumbnailUrl,
//       courseDescription: plan.courseDescription,
//       topics: plan.topics,
//       updatedPlanId: plan._id,
//     });
//     setIsEditing(true);
//     setShowForm(true);
//   };

//   const handleUpdatePlan = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:8080/api/plans/${formData.updatedPlanId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           title: formData.title,
//           description: formData.description,
//           thumbnailUrl: formData.thumbnailUrl,
//           courseDescription: formData.courseDescription,
//           isPaid: formData.isPaid,
//           price: formData.isPaid ? parseFloat(formData.price) || 0.0 : 0.0,
//           topics: formData.topics,
//         }),
//       });

//       if (!response.ok) throw new Error('Failed to update plan');
//       const updated = await response.json();
//       setPlans((prev) =>
//         prev.map((p) => (p._id === updated._id ? updated : p))
//       );
//       alert('Plan updated successfully!');
//       resetForm();
//     } catch (error) {
//       console.error('Error updating plan:', error);
//       alert('Failed to update plan.');
//     }
//   };

//   const handleDeletePlan = async (id) => {
//     if (window.confirm('Are you sure you want to delete this plan?')) {
//       try {
//         const response = await fetch(`http://localhost:8080/api/plans/${id}`, {
//           method: 'DELETE',
//         });
//         if (!response.ok) throw new Error('Delete failed');
//         setPlans((prev) => prev.filter((p) => p._id !== id));
//       } catch (error) {
//         console.error('Delete error:', error);
//       }
//     }
//   };

//   const resetForm = () => {
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
//     setIsEditing(false);
//     setShowForm(false);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="manage-learning">
//         <h2 className="page-title">Manage Your Learning</h2>

//         <div className="tab-switcher-box">
//           <button onClick={() => setActiveTab('plans')} className={activeTab === 'plans' ? 'active-tab-btn' : 'tab-btn'}>Plans</button>
//           <button onClick={() => setActiveTab('progress')} className={activeTab === 'progress' ? 'active-tab-btn' : 'tab-btn'}>Progress</button>
//         </div>

//         <div className="plans-info">
//           <div className="plans-info-header">
//             <div>
//               <h3>Learning Plans</h3>
//               <p>Create and manage your learning plans.</p>
//             </div>
//             <button className="new-plan-btn" onClick={() => setShowForm((prev) => !prev)}>
//               📌 {isEditing ? 'Cancel Edit' : 'New Plan'}
//             </button>
//           </div>
//         </div>

//         {showForm && (
//           <form className="create-form" onSubmit={isEditing ? handleUpdatePlan : handleCreatePlan}>
//             <input name="userId" value={formData.userId} onChange={handleInputChange} placeholder="User ID" required />
//             <button type="button" onClick={() => fetchPlans(formData.userId)}>🔄 Load My Plans</button>
//             <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required />
//             <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Short Description" rows={2} />
//             <label>
//               <input type="checkbox" name="isPaid" checked={formData.isPaid} onChange={(e) => setFormData((prev) => ({ ...prev, isPaid: e.target.checked }))} />
//               Paid Course
//             </label>
//             {formData.isPaid && <input name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="Price (USD)" />}
//             <input name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleInputChange} placeholder="Thumbnail URL" />
//             <textarea name="courseDescription" value={formData.courseDescription} onChange={handleInputChange} placeholder="Full Description" rows={3} />

//             <h4>Topics</h4>
//             {formData.topics.map((topic, index) => (
//               <div key={index} className="topic-box">
//                 <input placeholder="Topic Title" value={topic.title} onChange={(e) => updateTopic(index, 'title', e.target.value)} />
//                 <input placeholder="Description" value={topic.description} onChange={(e) => updateTopic(index, 'description', e.target.value)} />
//                 <input placeholder="Video URL" value={topic.videoUrl} onChange={(e) => updateTopic(index, 'videoUrl', e.target.value)} />
//                 <button type="button" onClick={() => removeTopic(index)} disabled={formData.topics.length === 1}>🗑</button>
//               </div>
//             ))}
//             <button type="button" onClick={() => setFormData((prev) => ({ ...prev, topics: [...prev.topics, { title: '', description: '', completed: false, videoUrl: '' }] }))}>
//               ➕ Add Topic
//             </button>
//             <button type="submit">{isEditing ? 'Update Plan' : 'Create Plan'}</button>
//           </form>
//         )}

//         <h3>Learning Plans</h3>
//         {plans.map((plan) => (
//           <PlanCard key={plan._id} plan={plan} onEdit={handleEditPlan} onDelete={() => handleDeletePlan(plan._id)} />
//         ))}
//       </div>
//     </>
//   );
// };
import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import PlanCard from '../Components/PlanCard';
import LearningPlanForm from '../Components/LearningPlanForm';
import '../styles/ManagePlans.css';

const ManagePlans = () => {
  const [activeTab, setActiveTab] = useState('plans');
  const [showForm, setShowForm] = useState(false);
  const [plans, setPlans] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    userId: '', // ✅ Make sure this is set correctly when creating plans
    title: '',
    description: '',
    status: 'In Progress',
    thumbnailUrl: '',
    courseDescription: '',
    updatedPlanId: '',
    topics: [
      {
        title: '',
        description: '',
        completed: false,
        videoUrl: '',
      },
    ],
  });

  // ✅ Auto-fetch plans on load if needed (optional)
  useEffect(() => {
    if (formData.userId) {
      fetchPlans(formData.userId);
    }
  }, [formData.userId]);

  const fetchPlans = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/plans/user/${userId}`);
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('❌ Error fetching plans:', error);
    }
  };

  const handleCreatePlan = async (newPlanData) => {
    try {
      const response = await fetch('http://localhost:8080/api/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlanData),
      });

      const savedPlan = await response.json();
      setPlans((prev) => [savedPlan, ...prev]);
      setShowForm(false);
    } catch (error) {
      alert('❌ Failed to create plan.');
    }
  };

  const handleEditPlan = (plan) => {
    const planId = plan._id || plan.id;
    console.log("✏️ Editing plan ID:", planId);
    setFormData({ ...plan, updatedPlanId: planId });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdatePlan = async (updatedPlanData) => {
    try {
      const id = updatedPlanData.updatedPlanId;
      console.log("🔥 Sending PUT to ID:", id);

      const response = await fetch(`http://localhost:8080/api/plans/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPlanData),
      });

      if (!response.ok) throw new Error("Update failed");

      await response.json();
      await fetchPlans(updatedPlanData.userId);
      setShowForm(false);
      setIsEditing(false);
    } catch (error) {
      alert('❌ Failed to update plan.');
    }
  };

  const handleDeletePlan = async (planObj) => {
    const planId = planObj?._id || planObj?.id;
    if (!planId) {
      console.error("❌ Plan ID is undefined:", planObj);
      return;
    }
  
    console.log("🗑 Deleting plan ID:", planId);
  
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
  
    try {
      const res = await fetch(`http://localhost:8080/api/plans/${planId}`, {
        method: 'DELETE',
      });
  
      if (res.ok) {
        await fetchPlans(formData.userId);
      } else {
        alert('❌ Failed to delete.');
      }
    } catch (err) {
      alert('❌ Delete error.');
      console.error(err);
    }
  };
  
  
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-white to-gray-100 min-h-screen p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Manage Your Learning</h2>

        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-white rounded-lg shadow p-1">
            <button
              className={`px-4 py-2 rounded-l-md font-medium ${activeTab === 'plans' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-purple-600'}`}
              onClick={() => setActiveTab('plans')}
            >
              Learning Plans
            </button>
            <button
              className={`px-4 py-2 rounded-r-md font-medium ${activeTab === 'progress' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-purple-600'}`}
              onClick={() => setActiveTab('progress')}
            >
              Progress Updates
            </button>
          </div>
        </div>

        <div className="flex justify-start mb-4">
          <button
            className="bg-purple-600 text-white px-5 py-2 rounded-md shadow hover:bg-purple-700 transition"
            onClick={() => setShowForm(true)}
          >
            📌 New Plan
          </button>
        </div>

        {showForm && (
          <LearningPlanForm
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
            onSubmit={isEditing ? handleUpdatePlan : handleCreatePlan}
            onCancel={() => {
              setShowForm(false);
              setIsEditing(false);
              setFormData((prev) => ({ ...prev, updatedPlanId: '' }));
            }}
          />

        )}

        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">My Learning Plans</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {plans.map((plan) => (
            <PlanCard
              key={plan._id}
              plan={plan}
              onEdit={() => handleEditPlan(plan)}
              onDelete={(planObj) => handleDeletePlan(planObj)} 
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ManagePlans;
