// src/features/courses/CourseCard.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enrollInCourse, fetchCourseById, unenrollFromCourse } from "./coursesSlice";
import ConfirmModal from "./ConfirmModal";
import "./CourseCard.css";

export default function CourseCard({ course, showEnroll = true }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [showModal, setShowModal] = useState(false);

  const handleEnroll = (id) => {
    dispatch(enrollInCourse(id));
  };

  const handleViewCourse = () => {
    dispatch(fetchCourseById(course._id));
  };

  const handleUnenroll = () => {
    dispatch(unenrollFromCourse(course._id));
    setShowModal(false);
  };

  const isEnrolled = course.enrolledUsers?.some((u) => u._id === user?._id);

  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} style={{ width: "100%", borderRadius: "6px" }} />
      <h3>{course.title}</h3>
      <p>{course.description}</p>

      {showEnroll && (
        isEnrolled ? (
          <button onClick={() => setShowModal(true)} style={{ backgroundColor: "green", color: "white" }}>
            Enrolled
          </button>
        ) : (
          <button onClick={() => handleEnroll(course._id)}>Enroll</button>
        )
      )}

      {/* <button
        onClick={() =>
          alert(course.enrolledUsers.map((u) => u.email).join(", ") || "No users yet")
        }
      >
        View Users
      </button> */}
      <button onClick={handleViewCourse}>View Course</button>

      {/* ✅ Confirmation Modal */}
      <ConfirmModal
        show={showModal}
        message="Do you want to unenroll from this course?"
        onConfirm={handleUnenroll}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}
