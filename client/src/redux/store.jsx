import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./features/course/courseSlice";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: [thunk],
});

export default store;
