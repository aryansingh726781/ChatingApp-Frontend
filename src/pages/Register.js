

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true); // Start loader
    try {
      const response = await axios.post('https://chatappbackend-69og.onrender.com/register', { username, password });
      // alert(`Registered at: ${new Date(response.data.user.createdAt).toLocaleString()}`);
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="register-container">
      {loading ? (
        <div className="loader">Loading...</div> // Loader component
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
             <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 mb-2 w-64"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 mb-4 w-64"
            />
            <button onClick={handleRegister} className="bg-blue-500 text-white p-2 w-64">
              Register
            </button>
            <p className="mt-4">
              Already have an account?{' '}
              <span onClick={() => navigate('/login')} className="text-blue-500 cursor-pointer">
                Login
              </span>
            </p>
          </div>
      )}
    </div>
  );
};

export default Register;
