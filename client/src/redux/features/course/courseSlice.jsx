import { createSlice } from "@reduxjs/toolkit";
 

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    data: [],
    courseDetails: {},
  },
  reducers: {
    setCourses: (state, action) => {
      state.data = action.payload;
    },
    setCourseDetails: (state, action) => {
      state.courseDetails = action.payload;
    },
  },
});

export const { setCourses, setCourseDetails } = courseSlice.actions;
export const selectCourses = (state) => state.courses.data;
export const selectCourseDetails = (state) => state.courses.courseDetails;
export default courseSlice.reducer;

