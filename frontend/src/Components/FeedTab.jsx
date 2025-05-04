import React from 'react';

const FeedTab = () => (
  <div className="tab-content">
    <div className="post-form">
      <textarea placeholder="Share your coding skills, progress, or learning plan..." />
      <div className="media-buttons">
        <button>Add Photos</button>
        <button>Add Video</button>
      </div>
      <input type="text" placeholder="Add tags..." />
      <button className="post-btn">Post</button>
    </div>
    <div className="post">
      <div className="post-header">
        <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Jane Cooper" />
        <div>
          <p>Jane Cooper</p>
          <small>Skill Share</small>
        </div>
      </div>
      <img className="post-image" src="https://via.placeholder.com/600x300" alt="code post" />
      <p>Just built my first React component library! #React #UI</p>
      <div className="post-footer">
        <span>💜 234</span>
        <span>💬 12 comments</span>
      </div>
      <div className="comments">
        <div className="comment">
          <strong>Emily:</strong> This is super helpful, thanks!
        </div>
        <div className="comment">
          <strong>Lucas:</strong> I love the component design 🔥
        </div>
      </div>
      <input className="comment-input" placeholder="Add a comment..." />
    </div>
  </div>
);

export default FeedTab;
