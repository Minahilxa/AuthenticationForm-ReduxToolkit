// src/features/auth/authApi.js
import axiosInstance from "../../services/axiosInstance";

export const loginApi = (email, password) =>
  axiosInstance.post("/auth/login", { email, password });

export const registerApi = (name, email, password, pfp) =>
  axiosInstance.post("/auth/register", { name, email, password, pfp });
