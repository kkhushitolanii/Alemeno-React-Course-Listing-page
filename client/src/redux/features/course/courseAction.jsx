import { fetchCourseDetails, fetchCourses } from "../../../api/courseApi";
import { setCourses, setCourseDetails } from "./courseSlice";

export const fetchCoursesAsync = (keyword) => async (dispatch) => {
  try {
    const response = await fetchCourses(keyword);
    dispatch(setCourses(response));
  } catch (err) {
    console.error("Error fetching courses: ", err);
    throw err;
  }
};

export const fetchCourseDetailsAsync = (courseId) => async (dispatch) => {
  try {
    const response = await fetchCourseDetails(courseId);
    console.log(`courseDetails : ${response}`);
    dispatch(setCourseDetails(response));
  } catch (err) {
    console.error(`Error : ${err}`);
    throw err;
  }
};
