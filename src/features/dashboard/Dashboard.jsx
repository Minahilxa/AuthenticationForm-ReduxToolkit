// src/features/dashboard/Dashboard.jsx
import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import CourseCard from "../courses/CourseCard";

export default function Dashboard() {
  const courses = useSelector((state) => state.courses.allCourses);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <h2>Available Courses</h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </main>
    </div>
  );
}
