// src/features/auth/AuthForm.jsx
import React, { useState } from "react"; // React and useState hook
import { useSelector, useDispatch } from "react-redux"; // Redux hooks useSelector (to read data from the Redux store) and useDispatch (to send actions to the Redux store).
import { login, signup, toggleForm } from "./authSlice"; // Import actions

export default function AuthForm() {
  // Access state from Redux (checking the state of form)
  const { showLogin } = useSelector((state) => state.auth); 
  // Get dispatch function This function will be called later to send actions to the Reducer.
  const dispatch = useDispatch();

  // Local state for form inputs
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  // Function runs when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (showLogin) {
      // If login form is shown
      dispatch(login({ email: formData.email })); // Dispatch login action
    } else {
      // If register form is shown
      dispatch(signup({ name: formData.name, email: formData.email })); // Dispatch signup action
    }
    // Clear form after submit
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
      {/* Heading changes depending on form */}
      <h2>{showLogin ? "Login" : "Register"}</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Name field only visible when registering */}
        {!showLogin && (
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        )}
        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        {/* Submit button */}
        <button type="submit">{showLogin ? "Login" : "Register"}</button>
      </form>

      {/* Toggle between login/register */}
      <p style={{ marginTop: "10px", cursor: "pointer", color: "blue" }} onClick={() => dispatch(toggleForm())}>
        {showLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </p>
    </div>
  );
}
