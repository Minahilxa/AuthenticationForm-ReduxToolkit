// src/features/auth/AuthForm.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser, toggleForm } from "./authSlice";
import Popup from "../../components/Popup";
import styles from "./AuthForm.module.css";

export default function AuthForm() {
  const { showLogin, loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    pfp: "",
  });

  const [popup, setPopup] = useState({ message: null, type: null });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showLogin) {
      dispatch(loginUser({ email: formData.email, password: formData.password }))
        .unwrap()
        .catch((msg) => setPopup({ message: msg, type: "error" }));
    } else {
      dispatch(registerUser(formData))
        .unwrap()
        .catch((msg) => setPopup({ message: msg, type: "error" }));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.heading}>{showLogin ? "Login" : "Register"}</h2>

        <Popup
          message={popup.message || error}
          type="error"
          onClose={() => setPopup({ message: null, type: null })}
        />

        <form onSubmit={handleSubmit} className={styles.form}>
          {!showLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                name="pfp"
                placeholder="Profile Picture URL"
                value={formData.pfp}
                onChange={handleChange}
                className={styles.input}
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
          />

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Please wait..." : showLogin ? "Login" : "Register"}
          </button>
        </form>

        <button onClick={() => dispatch(toggleForm())} className={styles.toggleBtn}>
          {showLogin ? "Need an account? Register" : "Already have an account? Login"}
        </button>

        {isAuthenticated && (
          <p className={styles.welcome}>Welcome, {user?.name} 🎉</p>
        )}
      </div>
    </div>
  );
}
