import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    courseID: null,
    enrolledCoursesID: null,
  },
  reducers: {
    setEnrollment: (state, action) => {
      state.user = action.payload.user;
      state.courseID = action.payload.courseID;
    },
    setEnrollmentCoursesID: (state, action) => {
      state.enrolledCoursesID = action.payload;
    },
  },
});

export const { setEnrollment, setEnrollmentCoursesID } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectCourseID = (state) => state.user.courseID;
export const selectEnrolledCoursesID = (state) => state.user.enrolledCoursesID;
export default userSlice.reducer;

