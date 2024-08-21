// src/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    setToken('');
    // Redirect to the login page
    navigate('/login');
  }, [navigate, setToken]);

  return (
    <div className="flex flex-col items-center h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Logging out...</h2>
    </div>
  );
};

export default Logout;
