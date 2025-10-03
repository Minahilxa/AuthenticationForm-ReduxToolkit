// src/features/dashboard/Dashboard.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/Sidebar";
import CourseCard from "../courses/CourseCard";
import { fetchAllCourses, fetchEnrolledCourses } from "../courses/coursesSlice";
import "./Layout.css";
import NewCourseModal from "../../components/NewCourseModal";
import CourseDetail from "../courses/CourseDetail";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { all, enrolled, status, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchAllCourses());
    dispatch(fetchEnrolledCourses());
  }, [dispatch]);

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="main-content">
        {/* Available courses */}
        <h2 style={{ color: "#fff", marginBottom: "20px" }}>
          Available Courses
        </h2>

        {status === "loading" && <p style={{ color: "#fff" }}>Loading...</p>}
        {status === "failed" && <p style={{ color: "red" }}>Error: {error}</p>}

        <div className="course-list">
          {all.map((course) => (
            // ✅ Here Enroll button should be shown
            <CourseCard key={course._id} course={course} showEnroll={true} />
          ))}
        </div>

        {/* Enrolled courses */}
        <h2 style={{ color: "#fff", margin: "40px 0 20px" }}>
          Enrolled Courses
        </h2>
        <div className="course-list">
          {enrolled && enrolled.length > 0 ? (
            enrolled.map((course) => (
              // ✅ Hide Enroll button here
              <CourseCard key={course._id} course={course} showEnroll={false} />
            ))
          ) : (
            <p style={{ color: "#fff" }}>
              You are not enrolled in any courses.
            </p>
          )}
        </div>
          <h2 style={{ color: "#fff", margin: "40px 0 20px" }}>
          Owned Courses
        </h2>
        
        {/* Modals */}
        <NewCourseModal />
        <CourseDetail />
      </div>
    </div>
  );
}
