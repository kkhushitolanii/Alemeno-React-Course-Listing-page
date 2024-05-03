import { Enrollment } from "../models/user.js";

export const enrollIntoCourse = async (req, res) => {
  try {
    const { user, courseID } = req.body;

    const existingEnrollment = await Enrollment.findOne({
      user: user,
      courseIDs: { $in: [courseID] },
    });

    if (!existingEnrollment) {
      const updatedEnrollment = await Enrollment.findOneAndUpdate(
        { user: user },
        { $addToSet: { courseIDs: courseID } },
        { upsert: true, new: true }
      );

      return res.status(201).json({
        message: "Enrolled into course successfully",
        data: updatedEnrollment,
      });
    } else {
      return res.status(200).json({
        message: "User is already enrolled into the course",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};

export const getEnrolledCourse = async (req, res) => {
  try {
    const user = req.params.user;
    const enrolledCourses = await Enrollment.findOne({ user: user });

    if (!enrolledCourses) {
      return res
        .status(400)
        .json({ message: "No user found or No courses enrolled" });
    }

    return res.status(200).json({ enrolledCourses: enrolledCourses.courseIDs });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal Server Error");
  }
};

