import axios from "axios";

export const fetchCourses = async (keyword) => {
  try {
    const API = "http://localhost:3000/api/courses/";
    const response = await axios.get(API, {
      params: {
        keyword: keyword,
      },
    });
    const coursesData = response.data;
    // console.log({ coursesData });
    return coursesData;
  } catch (err) {
    console.error(`Error: ${err}`);
    throw err;
  }
};

export const fetchCourseDetails = async (courseId) => {
  try {
    const API = `http://localhost:3000/api/courses/${courseId}`;
    const response = await axios.get(API);
    const courseDetails = response.data;
    return courseDetails;
  } catch (err) {
    console.log(`Error : ${err}`);
    throw err;
  }
};
