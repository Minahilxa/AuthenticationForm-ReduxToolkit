// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";  // Import createSlice helper

// Initial state for authentication
const initialState = {
  user: null,              // Stores logged in user info
  isAuthenticated: false,  // Whether user is logged in or not
  showLogin: true,         // true = show Login form, false = show Register form
};

// Create a slice for authentication
const authSlice = createSlice({
  name: "auth",           // Slice name
  initialState,           // Initial state
  reducers: {             // Reducers = functions that update state
    toggleForm: (state) => {
      state.showLogin = !state.showLogin; // Switch between login/register form
    },
    login: (state, action) => {
      state.user = action.payload;  // Save user data from action
      state.isAuthenticated = true; // Mark user as logged in
    },
    signup: (state, action) => {
      state.user = action.payload;  // Save user data from signup
      state.isAuthenticated = true; // Mark user as logged in
    },
    logout: (state) => {
      state.user = null;            // Clear user info
      state.isAuthenticated = false;// Mark user as logged out
    },
  },
});

// Export actions so we can use them in components
export const { toggleForm, login, signup, logout } = authSlice.actions;

// Export reducer to be used in store
export default authSlice.reducer;
