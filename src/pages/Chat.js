

// // // //new




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import { useNavigate } from 'react-router-dom';

// const Chat = ({ token }) => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [profile, setProfile] = useState({ username: '', id: '' });
//   const navigate = useNavigate();

//   useEffect(() => {


    
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get('https://chatappbackend-69og.onrender.com/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProfile(res.data);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get('https://chatappbackend-69og.onrender.com/messages', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setMessages(res.data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     fetchProfile();
//     fetchMessages();

//     const newSocket = io('https://chatappbackend-69og.onrender.com/', {
//       auth: { token },
//     });

//     newSocket.on('message', (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     setSocket(newSocket);

//     return () => newSocket.close();
//   }, [token]);

//   const sendMessage = () => {
//     if (socket) {
//       socket.emit('message', message);
//       setMessage('');
//     }
//   };

//   const deleteMessage = async (id) => {
//     try {
//       await axios.delete(`https://chatappbackend-69og.onrender.com/messages/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== id));
//     } catch (error) {
//       console.error('Error deleting message:', error);
//     }


//   };

//   return (
//     <div className="flex flex-col items-center h-screen p-4">
//       <h2 className="text-2xl font-bold mb-4">Chat</h2>
//       <div className="border p-4 mb-4 w-full max-w-md">
//         <h3 className="text-lg font-bold">User Profile</h3>
//         <p><strong>Username:</strong> {profile.username}</p>
//         <p><strong>ID:</strong> {profile._id}</p>
//       </div>
//       <div className="flex flex-col border p-4 mb-4 w-full max-w-md h-80 overflow-y-auto">
//         {messages.map((msg) => (
//           <div key={msg._id} className="flex justify-between items-center mb-2">
//             <div>
//               <strong>{msg.username}: </strong>
//               {msg.message}
//             </div>
//             <button
//               onClick={() => deleteMessage(msg._id)}
//               className="text-red-500 hover:text-red-700"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         placeholder="Message"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         className="border p-2 mb-2 w-full max-w-md"
//       />
//       <button onClick={sendMessage} className="bg-blue-500 text-white p-2 w-full max-w-md">
//         Send
//       </button>
//       <button onClick={() => navigate('/logout')} className="bg-red-500 text-white p-2 w-full max-w-md mt-4">
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Chat;










// src/pages/Chat.js
import '../App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon from React Icons


const Chat = ({ token }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [profile, setProfile] = useState({ username: '', _id: '' });
  const [loading, setLoading] = useState(true);
  const [dateTime, setDateTime] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:5000/profile', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setProfile(res.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching profile:', error);
  //       setLoading(false);
  //     }
  //   };

  //   const fetchMessages = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:5000/messages', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setMessages(res.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching messages:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  //   fetchMessages();

  //   const newSocket = io('http://localhost:5000/', {
  //     auth: { token },
  //   });

  //   newSocket.on('message', (data) => {
  //     setMessages((prevMessages) => [...prevMessages, data]);
  //   });


  //   newSocket.on('message-seen', ({ messageId, userId }) => {
  //     setMessages((prevMessages) =>
  //       prevMessages.map((msg) =>
  //         msg._id === messageId
  //           ? { ...msg, seenBy: [...msg.seenBy, userId] }
  //           : msg
  //       )
  //     );
  //   });

  //   setSocket(newSocket);

  //   return () => newSocket.close();
  // }, [token]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const now = new Date();
  //     setDateTime(now.toLocaleString());
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  // const sendMessage = () => {
  //   if (socket) {
  //     socket.emit('message', message);
  //     setMessage('');
  //   }
  // };


  // const markMessageAsSeen = (messageId) => {
  //   if (socket) {
  //     socket.emit('message-seen', messageId);
  //   }
  // };

  // const deleteMessage = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/messages/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== id));
  //   } catch (error) {
  //     console.error('Error deleting message:', error);
  //   }
  // };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }


  if ('Notification' in window && navigator.serviceWorker) {
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    });
  }

  const fetchProfile = async () => {
    try {
      const res = await axios.get('https://chatappbackend-69og.onrender.com/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

   const fetchMessages = async () => {
    try {
      const res = await axios.get('https://chatappbackend-69og.onrender.com/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  fetchProfile();
  fetchMessages();

  const newSocket = io('https://chatappbackend-69og.onrender.com/', {
    auth: { token },
  });

  newSocket.on('message', (data) => {
    setMessages((prevMessages) => [...prevMessages, data]);
    showNotification(data); // Show mobile notification when a new message is received
  });

  newSocket.on('message', (data) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  });

  newSocket.on('message-seen', ({ messageId, userId }) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === messageId ? { ...msg, seenBy: [...msg.seenBy, userId] } : msg
      )
    );
  });




  setSocket(newSocket);

  return () => newSocket.close();
}, [token]);

useEffect(() => {
  const interval = setInterval(() => {
    const now = new Date();
    setDateTime(now.toLocaleString());
  }, 1000);

  return () => clearInterval(interval);
}, []);


const showNotification = (msg) => {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(msg.username, {
        body: msg.message,
        icon: "../public/chat.png",
        tag: 'new-message',
        renotify: true,
      });
    });
  }
};

const sendMessage = async () => {
  if (message.trim()) {
    setLoading(true); // Show loader
    try {
      socket.emit('message', message);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false); // Hide loader
    }
  }
};

   const markMessageAsSeen = (messageId) => {
    if (socket) {
      socket.emit('message-seen', messageId);
    }
  };

const deleteMessage = async (id) => {
  try {
    await axios.delete(`https://chatappbackend-69og.onrender.com/messages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== id));
  } catch (error) {
    console.error('Error deleting message:', error);
  }
};

const markAsSeen = (messageId) => {
  socket.emit('message-seen', messageId);
};


// const showNotification = (msg) => {
//   toast.info(`${msg.username}: ${msg.message}`, {
//     position: 'top-right',
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: 'dark',
//   });
// };

if (loading) {
  return <div className="flex justify-center items-center h-screen"><FaSpinner className="spinner" /></div>;
}

  return (
    <div className="flex flex-col items-center h-screen p-4">
      {/* <ToastContainer /> Toast container for notifications */}
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      <div className="border p-4 mb-4 w-full max-w-md">
        <h3 className="text-lg font-bold">User Profile</h3>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>ID:</strong> {profile._id}</p>
        <p><strong>Current Date and Time:</strong> {dateTime}</p>
      </div>
      <div className="flex flex-col border p-4 mb-4 w-full max-w-md h-80 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg._id} className="flex justify-between items-center mb-2"
         
         
          onClick={() => markMessageAsSeen(msg._id)}>
            <div>
              <strong>{msg.username}: </strong>
              {msg.message}
              <br />
              <small className="text-gray-500">{new Date(msg.timestamp).toLocaleString()}</small> {/* Display the message time */}
            </div>
            <div>
      {msg.seenBy && Array.isArray(msg.seenBy) && msg.seenBy.includes(profile._id) ? (
        <span className="text-green-500">✓✓</span> // Seen by everyone
      ) : (
        <span className="text-gray-500">✓</span> // Only sent
      )}
    </div>

            <button
              onClick={() => deleteMessage(msg._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 mb-2 w-full max-w-md"
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white p-2 w-full max-w-md">
        Send
      </button>
      <button onClick={() => navigate('/logout')} className="bg-red-500 text-white p-2 w-full max-w-md mt-4">
        Logout
      </button>
    </div>
  );
};

export default Chat;

