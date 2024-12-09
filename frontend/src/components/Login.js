import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
      });
      setMessage('Login successful!');
      const { token } = response.data;
      // Store the token (e.g., in localStorage)
      localStorage.setItem('token', token);
      // Redirect based on role
      if (username === 'Admin') {
        navigate('/AdminMenu');
      } else if (username === 'Staff1') {
        navigate('/StaffDashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      setMessage('Error logging in. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <p>Don't have an account? <span className="signup-link" onClick={() => navigate('/signup')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Sign up here</span></p>
    </div>
  );
};

export default Login;
