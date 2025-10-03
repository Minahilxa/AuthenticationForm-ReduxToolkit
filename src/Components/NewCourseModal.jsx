// src/components/NewCourseModal.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../features/courses/coursesSlice";
import { closeNewCourseModal } from "../features/ui/uiSlice";
import "./NewCourseModal.css";
import Cookies from "js-cookie";

export default function NewCourseModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.newCourseModalOpen);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  if (!isOpen) return null; // don’t render if closed

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = Cookies.get("token");
    console.log("Token from cookies:", token);

    // ✅ dispatch with form data instead of hardcoded values
    await dispatch(createCourse(form)).unwrap();

    console.log("Course created successfully");
  } catch (err) {
    console.error("Failed to create course:", err);
  }
};

  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New Course</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <div className="modal-actions">
            <button type="submit">Create</button>
            <button
              type="button"
              onClick={() => dispatch(closeNewCourseModal())}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
