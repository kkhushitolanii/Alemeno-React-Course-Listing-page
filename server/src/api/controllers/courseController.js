import {
  courseService,
  courseDetailsService,
} from "../services/courseServices.js";

export const getCourseListController = async (req, res) => {
  const { keyword } = req.query;

  try {
    const courses = await courseService(keyword);
    console.log("Courses from backend:", courses);
    return res.json(courses);
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
      err,
    });
  }
};

export const getCourseDetailsController = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const courseDetails = await courseDetailsService(courseId);
    console.log("CourseDetails from backend:", courseDetails);
    return res.json(courseDetails);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};
