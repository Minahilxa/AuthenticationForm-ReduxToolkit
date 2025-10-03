// src/features/courses/coursesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API = "http://localhost:5000/api/courses"; // adjust to your backend

// ========================
// Thunks for API calls
// ========================
export const fetchAllCourses = createAsyncThunk("courses/fetchAll", async () => {
  const res = await axios.get(API);
  return res.data;
});


export const fetchCourseById = createAsyncThunk("courses/fetchById", async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
});

export const fetchOwnedCourses = createAsyncThunk("courses/fetchOwned", async (_, { getState }) => {
      const token = Cookies.get("token");
  const res = await axios.get(`${API}/owned`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

export const fetchEnrolledCourses = createAsyncThunk("courses/fetchEnrolled", async (_, { getState }) => {
      const token = Cookies.get("token");
  const res = await axios.get(`${API}/enrolled`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

// export const createCourse = createAsyncThunk("courses/create", async (form, { getState }) => {
//   const token = getState().auth.token;
//   const res = await axios.post(API, form, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data;
// });
export const createCourse = createAsyncThunk(
  "courses/create",
  async (form, { rejectWithValue }) => {
    try {
      // ✅ get token from cookies
      const token = Cookies.get("token");
      console.log("Token from cookies:", token);

      const res = await axios.post(API, form, {
        withCredentials: true, // ✅ allow cookies (session handling / CORS)
        headers: token ? { Authorization: `Bearer ${token}` } : {}, // ✅ attach if exists
      });

      return res.data;
    } catch (err) {
      console.error("Create course failed:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateCourse = createAsyncThunk("courses/update", async ({ id, data }, { getState }) => {
  const token = getState().auth.token;
  const res = await axios.put(`${API}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

export const deleteCourse = createAsyncThunk("courses/delete", async (id, { getState }) => {
  const token = getState().auth.token;
  await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return id; // return id to remove from state
});

export const enrollInCourse = createAsyncThunk(
  "courses/enroll",
  async (id, { rejectWithValue }) => {
    try {
      // ✅ get token from cookies
      const token = Cookies.get("token");
      console.log("Token from cookies:", token);

      const res = await axios.post(
        `${API}/${id}/enroll`, // ✅ now id is a string
        {},
        {
          withCredentials: true, // ✅ allow cookies (session handling / CORS)
          headers: token ? { Authorization: `Bearer ${token}` } : {}, // ✅ attach if exists
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// export const unenrollFromCourse = createAsyncThunk("courses/unenroll", async (id, { getState }) => {
//       const token = Cookies.get("token");
//   const res = await axios.post(`${API}/${id}/unenroll`, {}, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data;
// });
export const unenrollFromCourse = createAsyncThunk(
  "courses/unenrollFromCourse",   // ✅ also renamed to be correct
  async (courseId, { rejectWithValue }) => {
    try {
      // ✅ get token from cookies
      const token = Cookies.get("token");

      const res = await axios.post(
        `${API}/${courseId}/unenroll`,
        {}, // body empty
        {
          withCredentials: true, // ✅ allow cookies if backend needs them
          headers: token ? { Authorization: `Bearer ${token}` } : {}, // ✅ attach token
        }
      );

      return res.data; // assume { course: updatedCourse, ... }
    } catch (err) {
      return rejectWithValue(err.response?.data ?? { message: err.message });
    }
  }
);
// ========================
// Slice
// ========================
const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    all: [],
    owned: [],
    enrolled: [],
    selected: null,
    status: "idle",
    error: null,
        selectedCourse: null,

  },
  reducers: {  clearSelectedCourse: (state) => {
      state.selectedCourse = null; // ✅ reset on close
    }, },
  extraReducers: (builder) => {
    builder
      // all courses
      .addCase(fetchAllCourses.pending, (state) => { state.status = "loading"; })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.all = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // by id
       .addCase(fetchCourseById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCourse = action.payload;   // ✅ SET HERE
      })
      .addCase(fetchCourseById.rejected, (state) => {
        state.status = "failed";
      })
      // owned
      .addCase(fetchOwnedCourses.fulfilled, (state, action) => {
        state.owned = action.payload;
      })
      // enrolled
      // enrolled courses
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.enrolled = action.payload; // ✅ store enrolled courses
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // create
      .addCase(createCourse.fulfilled, (state, action) => {
        state.owned.push(action.payload);
        state.all.push(action.payload);
      })
      // update
      .addCase(updateCourse.fulfilled, (state, action) => {
        const idx = state.all.findIndex(c => c._id === action.payload._id);
        if (idx >= 0) state.all[idx] = action.payload;
        const oIdx = state.owned.findIndex(c => c._id === action.payload._id);
        if (oIdx >= 0) state.owned[oIdx] = action.payload;
      })
      // delete
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.all = state.all.filter(c => c._id !== action.payload);
        state.owned = state.owned.filter(c => c._id !== action.payload);
        state.enrolled = state.enrolled.filter(c => c._id !== action.payload);
      })
      // enroll
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        const updated = action.payload;
        state.enrolled.push(updated);
        state.all = state.all.map(c => c._id === updated._id ? updated : c);
      })
      // unenroll
      .addCase(unenrollFromCourse.fulfilled, (state, action) => {
        const updated = action.payload;
        state.enrolled = state.enrolled.filter(c => c._id !== updated._id);
        state.all = state.all.map(c => c._id === updated._id ? updated : c);
      });
  },
});
export const { clearSelectedCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
