// axios.js — creates reusable axios instance and attaches auth token from localStorage
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api', // adjust if needed
});

// interceptor to add Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');          // token stored after login
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
