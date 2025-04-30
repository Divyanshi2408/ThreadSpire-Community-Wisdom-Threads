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

export const getCollections = () =>
  axios.get(`${API_BASE}/collections`, getAuthHeaders());

export const createCollection = (data) =>
  axios.post(`${API_BASE}/collections`, data, getAuthHeaders());

export const updateCollection = (id, data) =>
  axios.put(`${API_BASE}/collections/${id}`, data, getAuthHeaders());

export const deleteCollection = (id) =>
  axios.delete(`${API_BASE}/collections/${id}`, getAuthHeaders());

export const addThreadToCollection = (collectionId, threadId) =>
  axios.post(`${API_BASE}/collections/${collectionId}/add-thread`, { threadId }, getAuthHeaders());



