import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "../config/config.js";

export const courseService = async (keyword, page = 1) => {
  const pageSize = 100;

  const options = {
    method: "GET",
    url: `https://www.udemy.com/api-2.0/courses/?search=${keyword}&sort=popularity&page=${page}&page_size=${pageSize}`,
    headers: {
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    },
  };

  try {
    const response = await axios(options);
    const result = response.data.results;
    return result;
  } catch (err) {
    console.log("CourseList Error", err);
    throw err;
  }
};

export const courseDetailsService = async (courseId) => {
  const options = {
    method: "GET",
    url: `https://www.udemy.com/api-2.0/courses/${courseId}`,
    headers: {
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    },
  };

  try {
    const res = await axios(options);
    const data = res.data;
    return data;
  } catch (err) {
    console.log(`Error : ${err}`);
  }
};
