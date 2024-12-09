import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Auth.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        username,
        password,
        email,
      });

      // Assuming the response contains some useful data
      const { data } = response;
      setMessage('Signup successful! Please log in.');

      // You can now use the response data, for example:
      console.log('Signup response:', data);

      // If you want to redirect the user to the login page after signup
      navigate('/login');
    } catch (error) {
      setMessage('Error signing up. Please try again.');
      console.error('Signup error:', error);
    }
};


  return (
    <div className="auth-container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup} className="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
      <p>Already have account? <span className="signup-link" onClick={() => navigate('/login')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Sign in here</span></p>
    </div>
  );
};

export default Signup;