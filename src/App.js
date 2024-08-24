// import React, { useState } from 'react';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import Chat from './pages/Chat';

// const App = () => {
//   const [view, setView] = useState('register');
//   const [token, setToken] = useState('');

//   return (
//     <div>
//       {view === 'register' && <Register setView={setView} />}
//       {view === 'login' && <Login setToken={setToken} setView={setView} />}
//       {view === 'chat' && <Chat token={token} />}
//     </div>
//   );
// };

// export default App;




// new


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Logout from './pages/Logout';
import './App.css';
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/chat" element={token ? <Chat token={token} /> : <Navigate to="/login" />} />
        <Route path="/logout" element={<Logout setToken={setToken} />} />
        {/* <Route path="*" element={<Navigate to={token ? "/chat" : "/login"} />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
