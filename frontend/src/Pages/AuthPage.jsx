import React, { useState } from 'react';
import TabSwitcher from '../Components/TabSwitcher';
import AuthForm from '../Components/AuthForm';
import '../styles/Auth.css';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="auth-container">
      <h1>CodeShare</h1>
      <p>Connect with developers, share your skills, and grow together</p>
      <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} page="auth" />
      <AuthForm type={activeTab} />
    </div>
  );
};

export default AuthPage;

