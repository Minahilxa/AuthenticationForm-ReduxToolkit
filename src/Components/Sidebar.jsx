// src/components/Sidebar.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { toggleSidebar, closeSidebar } from "../features/ui/uiSlice";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Sidebar.css";
import { openNewCourseModal } from "../features/ui/uiSlice";

export default function Sidebar() {
  const user = useSelector((state) => state.auth.user);
  const isOpen = useSelector((state) => state.ui.sidebarOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(closeSidebar()); // close sidebar on logout
    navigate("/");
  };
  
 const handleNewCourse = () => {
    console.log("➕ Add new course button clicked"); // ✅ debug log
  dispatch(openNewCourseModal()); // 👈 this will open modal
};

  return (
    <>
      {/* Hamburger button */}
      <div className="menu-toggle" onClick={() => dispatch(toggleSidebar())}>
        <FaBars size={22} />
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="profile">
          <img src="https://via.placeholder.com/100" alt="Profile" />
          <h3>{user?.name || "User Name"}</h3>
          <p>{user?.email}</p>
        </div>

 <div className="Add-new-course">
          <button onClick={handleNewCourse}>Add new course</button>
        </div>

        <div className="logout">
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      </aside>
    </>
  );
}
