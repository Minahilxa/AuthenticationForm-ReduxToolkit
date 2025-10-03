// src/features/courses/CoursesList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCourses,
  fetchOwnedCourses,
  fetchEnrolledCourses,
  createCourse,
  enrollInCourse,
} from "./coursesSlice";
import CourseCard from "./CourseCard";
import CourseDetail from "./CourseDetail";   // ✅ import modal

export default function CoursesList() {
  const dispatch = useDispatch();
  const { all, owned, enrolled, status } = useSelector((s) => s.courses);
  const user = useSelector((s) => s.auth.user);

  const [active, setActive] = useState("available"); // tab: owned | enrolled | available
  const [form, setForm] = useState({ title: "", image: "", description: "" });

  useEffect(() => {
    // fetch all required lists
    dispatch(fetchAllCourses());
    if (user) {
      dispatch(fetchOwnedCourses());
      dispatch(fetchEnrolledCourses());
    }
  }, [dispatch, user]);

  // compute available: not owned and not enrolled
  const available = all.filter(
    (c) =>
      !owned.some((o) => o._id === c._id) &&
      !enrolled.some((e) => e._id === c._id)
  );

  const submitCreate = (e) => {
    e.preventDefault();
    dispatch(createCourse(form));
    setForm({ title: "", image: "", description: "" });
    setActive("owned");
  };

 const handleEnroll = (id) => {
  console.log("Enrolling course with ID:", id);
  dispatch(enrollInCourse({ courseId: id, token }));
};

  // render list based on active tab
  const list =
    active === "owned" ? owned : active === "enrolled" ? enrolled : available;

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          onClick={() => setActive("owned")}
          style={{ background: active === "owned" ? "#0b6" : "#eee" }}
        >
          Owned
        </button>
        <button
          onClick={() => setActive("enrolled")}
          style={{ background: active === "enrolled" ? "#0b6" : "#eee" }}
        >
          Enrolled
        </button>
        <button
          onClick={() => setActive("available")}
          style={{ background: active === "available" ? "#0b6" : "#eee" }}
        >
          Available
        </button>
      </div>

      {/* Create course form */}
      <div style={{ marginBottom: 20 }}>
        <h4>Create a course (will be owned by you)</h4>
        <form
          onSubmit={submitCreate}
          style={{ display: "grid", gap: 8, maxWidth: 500 }}
        >
          <input
            required
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <button type="submit">Create</button>
        </form>
      </div>

      {/* Courses grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 12,
        }}
      >
        {status === "loading" && <div>Loading...</div>}
        {list.map((c) => (
          <CourseCard
            key={c._id}
            course={c}
            onEnroll={() => handleEnroll(c._id)}
          />
        ))}
      </div>

      {/* ✅ Mount the modal once at the bottom */}
      <CourseDetail />
    </div>
  );
}
