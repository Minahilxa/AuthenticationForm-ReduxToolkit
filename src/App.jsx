// src/App.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./features/auth/AuthForm";
import Dashboard from "./features/dashboard/Dashboard";

export default function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Auth route */}
      <Route path="/" element={!isAuthenticated ? <AuthForm /> : <Navigate to="/dashboard" />} />

      {/* Dashboard route (protected) */}
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
    </Routes>
  );
}