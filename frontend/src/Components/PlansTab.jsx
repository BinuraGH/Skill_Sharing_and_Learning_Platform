import React from 'react';

const PlansTab = () => (
  <div className="tab-content">
    <div className="post">
      <div className="post-header">
        <img src="https://randomuser.me/api/portraits/men/52.jpg" alt="Cameron Williamson" />
        <div>
          <p>Cameron Williamson</p>
          <small>Plan Share</small>
        </div>
      </div>
      <p>My roadmap to becoming a fullstack developer:</p>
      <div className="plan-box">
        <ul>
          <li>HTML, CSS & JS Basics (2 weeks)</li>
          <li>React Frontend (4 weeks)</li>
          <li>Node.js Backend (4 weeks)</li>
        </ul>
      </div>
      <div className="post-footer">
        <span>💜 312</span>
        <span>💬 24 comments</span>
      </div>
      <div className="comments">
        <div className="comment">
          <strong>Linda:</strong> Love the structure. So inspiring!
        </div>
        <div className="comment">
          <strong>Sam:</strong> I'm on the same path! Good luck 🍀
        </div>
      </div>
      <input className="comment-input" placeholder="Add a comment..." />
    </div>
  </div>
);

export default PlansTab;