

// // //new




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const Chat = ({ token }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [profile, setProfile] = useState({ username: '', id: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('https://chatappbackend-69og.onrender.com/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchMessages = async () => {
      try {
        const res = await axios.get('https://chatappbackend-69og.onrender.com/messages', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [token]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`https://chatappbackend-69og.onrender.com/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      <div className="border p-4 mb-4 w-full max-w-md">
        <h3 className="text-lg font-bold">User Profile</h3>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>ID:</strong> {profile._id}</p>
      </div>
      <div className="flex flex-col border p-4 mb-4 w-full max-w-md h-80 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg._id} className="flex justify-between items-center mb-2">
            <div>
              <strong>{msg.username}: </strong>
              {msg.message}
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


// newwww
