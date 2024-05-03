import axios from "axios";

export const handleEnrollment = async (user, courseID) => {
  try {
    const API = "http://localhost:3000/api/enrollment";
    const response = await axios.post(
      API,
      {
        user: user,
        courseID: courseID,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    console.log("Enrollment response data:", data);
    return data;
  } catch (err) {
    console.log(`Error : ${err}`);
    throw err;
  }
};

export const fetchEnrolledCourses = async (user) => {
  try {
    const API = `http://localhost:3000/api/enrollment/${user}`;
    const response = await axios.get(API);
    const result = await response.data;
    const enrolledCoursesID = result.enrolledCourses;

    console.log(`Enrolled Data : ${enrolledCoursesID}`);
    return enrolledCoursesID;
  } catch (err) {
    console.log(`Error while fetching Enrolled Data ${err}`);
  }
};
