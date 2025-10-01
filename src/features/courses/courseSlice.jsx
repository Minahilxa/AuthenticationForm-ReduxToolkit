// src/features/courses/courseSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  allCourses: [
    { id: "1", title: "React Basics", description: "Learn fundamentals of React", image: "https://via.placeholder.com/200", enrolledUsers: [] },
    { id: "2", title: "Redux Toolkit", description: "State management made easy", image: "https://via.placeholder.com/200", enrolledUsers: [] },
  ],
  enrolledCourses: [],
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    enrollCourse: (state, action) => {
      const { courseId, user } = action.payload;
      const course = state.allCourses.find((c) => c.id === courseId);
      if (course && !course.enrolledUsers.find((u) => u.email === user.email)) {
        course.enrolledUsers.push(user);
        state.enrolledCourses.push(course);
      }
    },
  },
});

export const { enrollCourse } = courseSlice.actions;
export default courseSlice.reducer;
