import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = ({ setView }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const register = async () => {
    try {
      const res = await axios.post('https://chatappbackend-69og.onrender.com/register', { username, password });
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
    <button onClick={register} className="bg-blue-500 text-white p-2 w-64">
      Register
    </button>
    <p className="mt-4">
      Already have an account?{' '}
      <span onClick={() => navigate('/login')} className="text-blue-500 cursor-pointer">
        Login
      </span>
    </p>
  </div>
  );
};

export default Register;



// new

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/users/register', {
//         username,
//         password,
//       });
//       navigate('/login');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form className="bg-white p-6 rounded shadow-md" onSubmit={handleRegister}>
//         <h2 className="text-2xl mb-4">Register</h2>
//         <div className="mb-4">
//           <label className="block mb-1">Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;
