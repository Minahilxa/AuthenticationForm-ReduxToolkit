// src/features/courses/CourseCard.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { enrollCourse } from "./courseSlice";

export default function CourseCard({ course }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleEnroll = () => {
    dispatch(enrollCourse({ courseId: course.id, user }));
  };

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", margin: "10px", width: "250px" }}>
      <img src={course.image} alt={course.title} style={{ width: "100%", borderRadius: "6px" }} />
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <button onClick={handleEnroll}>Enroll</button>
      
      <button onClick={() => alert(course.enrolledUsers.map((u) => u.email).join(", ") || "No users yet")}>
        View Users
      </button>
    </div>
  );
}
