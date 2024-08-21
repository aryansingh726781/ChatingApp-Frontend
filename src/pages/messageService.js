import axios from 'axios';

const API_URL = 'https://chatappbackend-69og.onrender.com';

const getMessages = (token, userId) => {
  return axios.get(`${API_URL}/messages/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const sendMessage = (token, userId, message) => {
  return axios.post(`${API_URL}/messages/${userId}`, { message }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  getMessages,
  sendMessage,
};
