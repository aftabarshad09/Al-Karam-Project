// src/api.js
import axios from "axios";
import { auth } from "./firebase";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api/",
});

// Request interceptor to attach Firebase ID token
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken(); // returns Promise
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
