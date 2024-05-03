import { toast } from "react-toastify";
import { handleEnrollment, fetchEnrolledCourses } from "../../../api/userApi";
import { setEnrollment, setEnrollmentCoursesID } from "./userSlice";

export const handleEnrollmentAsync = (user, courseID) => async (dispatch) => {
  try {
    const response = await handleEnrollment(user, courseID);
    dispatch(setEnrollment(response));
    toast.info(response.message)
    console.log("Enrollment response", response);
    return response;
  } catch (err) {
    console.error("Enrollment failed", err);
    throw err;
  }
};

export const fetchEnrolledCoursesAsync = (user) => async (dispatch) => {
  try {
    const response = await fetchEnrolledCourses(user);
    dispatch(setEnrollmentCoursesID(response));
    console.log(`fetchAsync courses ${response}`);
    return response;
  } catch (err) {
    console.error("Error", err);
    throw err;
  } 
};

