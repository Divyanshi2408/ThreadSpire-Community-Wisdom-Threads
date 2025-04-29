import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getThreads = () => axios.get(`${API_BASE}/threads`);
export const createThread = (data) => axios.post(`${API_BASE}/threads`, data);