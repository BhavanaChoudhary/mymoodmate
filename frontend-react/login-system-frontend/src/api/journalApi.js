import axios from "axios";

const API_URL = "http://localhost:9091/api/journals";

export const getUserEntries = (userId) => {
  return axios.get(`${API_URL}/${userId}`);
};

export const createEntry = (userId, entry) => {
  return axios.post(`${API_URL}/${userId}`, entry);
};

export const deleteEntry = (entryId) => {
  return axios.delete(`${API_URL}/entry/${entryId}`);
};

export const getUserStreak = (userId) => {
  return axios.get(`${API_URL}/${userId}/streak`);
};
