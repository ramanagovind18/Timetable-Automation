// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login/', { username, password });
      console.log(response.data);
      setUser(response.data.user); // Set the user data received from the backend
      // Handle successful login, e.g., redirect to dashboard
    } catch (error) {
      console.error(error.response.data);
      // Handle login error
    }
  };

  return (
    <div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
