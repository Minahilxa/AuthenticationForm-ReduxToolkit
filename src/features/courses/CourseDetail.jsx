// src/features/courses/CourseDetail.jsx
import React, { useEffect } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedCourse } from "./coursesSlice";

export default function CourseDetail() {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courses.selectedCourse);
  const status = useSelector((s) => s.courses.status);

  useEffect(() => {
    console.log("CourseDetail mounted / selectedCourse changed:", course);
  }, [course]);

  const close = () => dispatch(clearSelectedCourse());

  return (
    <ReactModal
      isOpen={Boolean(course)}                // opens when course is truthy
      onRequestClose={close}
      shouldCloseOnOverlayClick={true}
      contentLabel="Course Details"
      ariaHideApp={true}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 10000, // make sure it sits above other UI
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          position: "relative",
          inset: "auto",
          maxWidth: "720px",
          width: "90%",
          maxHeight: "90vh",
          overflow: "auto",
          borderRadius: "12px",
          padding: "20px",
        },
      }}
    >
      {status === "loading" && !course ? (
        <div>Loading...</div>
      ) : course ? (
        <div>
          <button
            onClick={close}
            style={{
              position: "absolute",
              right: 12,
              top: 12,
              border: "none",
              background: "transparent",
              fontSize: 18,
              cursor: "pointer",
            }}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Header design similar to your screenshot */}
          <div style={{ background: "#111", borderRadius: "8px", padding: 18, color: "#fff", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%", background: "#87CEFA",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26
              }}>
                📘
              </div>
              <div>
                <h2 style={{ margin: 0 }}>{course.title}</h2>
                <div style={{ fontSize: 12, opacity: 0.9 }}>{course.ownerEmail}</div>
              </div>
            </div>
          </div>

          <img
            src={course.image || "https://placehold.co/900x400"}
            alt={course.title}
            style={{ width: "100%", maxHeight: 300, objectFit: "cover", borderRadius: 8 }}
          />

          <p style={{ marginTop: 12 }}>{course.description}</p>

          <div style={{ marginTop: 10 }}>
            <strong>Enrolled Users:</strong>
            <ul>
              {(course.enrolledUsers && course.enrolledUsers.length > 0) ? (
                course.enrolledUsers.map((u) => <li key={u._id || u.email}>{u.email || u.name}</li>)
              ) : (
                <li>No users enrolled yet</li>
              )}
            </ul>
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
            <button style={{ padding: "8px 14px", borderRadius: 8 }}>Primary Action</button>
            <button onClick={close} style={{ padding: "8px 14px", borderRadius: 8, background: "#fff" }}>Close</button>
          </div>
        </div>
      ) : null}
    </ReactModal>
  );
}
