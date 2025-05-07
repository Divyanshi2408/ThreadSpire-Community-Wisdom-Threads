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

export const addThreadToCollection = (collectionId, threadId) =>
  axios.post(`${API_BASE}/collections/${collectionId}/add-thread`, { threadId }, getAuthHeaders());

export const reactToThread = (threadId, reactionType) => {
  return axios.post(
    `${API_BASE}/threads/${threadId}/react`,
    { reactionType },
    getAuthHeaders()
  );
};

export const getMyThreads = () =>
  axios.get(`${API_BASE}/threads/mine`, getAuthHeaders());

export const getTrendingThreads = () =>
  axios.get(`${API_BASE}/threads/trending`, getAuthHeaders());

export const getThreadsByTag = (tagName) =>
  axios.get(`${API_BASE}/threads/tags/${tagName}`, getAuthHeaders());

export const getAllTagsWithCounts = () =>
  axios.get(`${API_BASE}/threads/tags`, getAuthHeaders());

export const updateThread = (threadId, updatedData) =>
  axios.put(`${API_BASE}/threads/${threadId}`, updatedData, getAuthHeaders());

export const deleteThread = (threadId) =>
  axios.delete(`${API_BASE}/threads/${threadId}`, getAuthHeaders());

export const forkThread = (threadId) =>
  axios.post(`${API_BASE}/threads/${threadId}/fork`, {}, getAuthHeaders());

export const getThreadById = (threadId) =>
  axios.get(`${API_BASE}/threads/${threadId}`, getAuthHeaders());

// Follow / Unfollow User
export const followUser = (targetId) =>
  axios.post(`${API_BASE}/auth/follow/${targetId}`, {}, getAuthHeaders());

export const unfollowUser = (targetId) =>
  axios.post(`${API_BASE}/auth/unfollow/${targetId}`, {}, getAuthHeaders());

// Get followers & following
export const getFollowers = (userId) =>
  axios.get(`${API_BASE}/auth/${userId}/followers`, getAuthHeaders());

export const getFollowing = (userId) =>
  axios.get(`${API_BASE}/auth/${userId}/following`, getAuthHeaders());

// Get user details
export const getUserById = (userId) =>
  axios.get(`${API_BASE}/auth/${userId}`, getAuthHeaders());

// Get threads by user
export const getUserThreads = (userId) =>
  axios.get(`${API_BASE}/threads/user/${userId}`, getAuthHeaders());

export const searchQuery = async (q) => {
  const res = await axios.get(`/api/search?q=${q}`);
  return res.data;
};