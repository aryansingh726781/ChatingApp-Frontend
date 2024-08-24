


// // //new


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = ({ setToken }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post('https://chatappbackend-69og.onrender.com/login', { username, password });
//       setToken(res.data.token);
//       navigate('/chat');
//     } catch (error) {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center h-screen p-4">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className="border p-2 mb-2 w-full max-w-md"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border p-2 mb-2 w-full max-w-md"
//       />
//       <button onClick={handleLogin} className="bg-blue-500 text-white p-2 w-full max-w-md">
//         Login
//       </button>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//       <p className="mt-4">
//       I have not an  account{' '}
//       <span onClick={() => navigate('/')} className="text-blue-500 cursor-pointer">
//         Register
//       </span>
//     </p>
//     </div>
//   );
// };

// export default Login;







import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const handleLogin = async () => {
    setLoading(true); // Start loader
    setError(''); // Reset any previous errors
    try {
      const res = await axios.post('https://chatappbackend-69og.onrender.com/login', { username, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      
      alert(`Last login: ${new Date().toLocaleString()}`); // Show the current time as last login
      navigate('/chat'); // Redirect to chat page
    } catch (error) {
      setError('Invalid credentials'); // Set the error message
    } finally {
      setLoading(false); // Stop loader
    }
  };
  return (
    <div className="login-container">
        {loading ? (
        <div className="loader">Loading...</div> // Loader component
      ) : (
        <div className="flex flex-col items-center h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-2 w-full max-w-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-2 w-full max-w-md"
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white p-2 w-full max-w-md">
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="mt-4">
        I have not an  account{' '}
        <span onClick={() => navigate('/')} className="text-blue-500 cursor-pointer">
          Register
        </span>
      </p>
      </div>
      )}
    </div>
  );
};

export default Login;



