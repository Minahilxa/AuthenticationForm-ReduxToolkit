// src/features/ui/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
    newCourseModalOpen: false, // 👈 new modal state

};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
      openNewCourseModal: (state) => {
      state.newCourseModalOpen = true;
    },
    closeNewCourseModal: (state) => {
      state.newCourseModalOpen = false;
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar, openNewCourseModal,
  closeNewCourseModal, } = uiSlice.actions;
export default uiSlice.reducer;
