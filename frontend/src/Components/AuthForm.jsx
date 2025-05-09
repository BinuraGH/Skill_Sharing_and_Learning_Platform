import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === 'signup' && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const endpoint = type === 'signup' ? 'http://localhost:8080/api/auth/signup' : 'http://localhost:8080/api/auth/login';

      const payload = {
        email: formData.email,
        password: formData.password,
        ...(type === 'signup' && { name: formData.name }),
      };

      const response = await axios.post(endpoint, payload, {
        withCredentials: true, // Important for cookies/session
      });
      
      setMessage(`${type === 'signup' ? 'Signup' : 'Login'} successful!`);
      console.log('Response:', response.data);

       // If login successful, redirect to /home
       if (type === 'login') {
        navigate('/Home'); // NEW
      }

      // Optionally reset form
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });

    } catch (error) {
      console.error('Error:', error.response?.data);
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };


  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{type === 'signup' ? 'Sign Up' : 'Login'}</h2>

      {message && <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}

      {type === 'signup' && (
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder={type === 'signup' ? 'Create a password' : 'Enter your password'}
        value={formData.password}
        onChange={handleChange}
        required
      />

      {type === 'signup' && (
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      )}

      <button type="submit">{type === 'signup' ? 'Sign Up' : 'Login'}</button>

      {type === 'login' && (
        <>
          <hr />
          <button type="button" className="google" onClick={handleGoogleLogin}>Sign in with Google</button>
          {/* <button type="button" className="facebook">Sign in with Facebook</button> */}
        </>
      )}
    </form>
  );
};

export default AuthForm;
