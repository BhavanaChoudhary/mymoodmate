import axios from "axios";

const API_URL = "http://localhost:9091/api/journals";

// Get logged in userId & token from localStorage
const getAuthData = () => {
  return {
    userId: localStorage.getItem("userId"),
    token: localStorage.getItem("token")
  };
};

export const getUserEntries = () => {
  const { userId, token } = getAuthData();
  return axios.get(`${API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createEntry = (entry) => {
  const { userId, token } = getAuthData();
  return axios.post(`${API_URL}/${userId}`, entry, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteEntry = (entryId) => {
  const { token } = getAuthData();
  return axios.delete(`${API_URL}/entry/${entryId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getUserStreak = () => {
  const { userId, token } = getAuthData();
  return axios.get(`${API_URL}/${userId}/streak`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
