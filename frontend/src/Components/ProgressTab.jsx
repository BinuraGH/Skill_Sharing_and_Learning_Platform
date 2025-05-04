import React from 'react';

const ProgressTab = () => (
  <div className="tab-content">
    <div className="post">
      <div className="post-header">
        <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Robert Fox" />
        <div>
          <p>Robert Fox</p>
          <small>Progress Share</small>
        </div>
      </div>
      <img className="post-image" src="https://via.placeholder.com/600x300" alt="progress post" />
      <p>Completed CLI tool! #Python #Learning</p>
      <div className="post-footer">
        <span>💜 156</span>
        <span>💬 8 comments</span>
      </div>
      <div className="comments">
        <div className="comment">
          <strong>Alice:</strong> Congrats, CLI tools are so useful!
        </div>
        <div className="comment">
          <strong>Daniel:</strong> Nice progress man, keep it up!
        </div>
      </div>
      <input className="comment-input" placeholder="Add a comment..." />
    </div>
  </div>
);

export default ProgressTab;
