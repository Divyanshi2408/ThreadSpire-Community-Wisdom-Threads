import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Auth APIs
export const registerUser = (userData) =>
  axios.post(`${API_BASE}/auth/register`, userData);

export const loginUser = (userData) =>
  axios.post(`${API_BASE}/auth/login`, userData);

// Threads
export const getThreads = () => axios.get(`${API_BASE}/threads`);

export const createThread = (data) =>
  axios.post(`${API_BASE}/threads`, data, getAuthHeaders());
