// src/components/Sidebar.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <aside style={{ width: "250px", background: "#f4f4f4", padding: "20px" }}>
      {/* <h3>{user?.name}</h3> */}
      <p>{user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </aside>
  );
}
