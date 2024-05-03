import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../layouts/Navbar/Navbar";
import { selectEnrolledCoursesID } from "../../redux/features/user/userSlice";
import { fetchCourseDetails } from "../../api/courseApi";
import "./Dashboard.css";

const Dashboard = () => {
  const enrolledCoursesID = useSelector(selectEnrolledCoursesID);
  const [courseDetails, setCourseDetails] = useState([]);

  useEffect(() => {
    console.log(`Dash ${enrolledCoursesID}`)
    const fetchEnrolledCoursesDetails = async () => {
      try {
        const details = await Promise.all(
          enrolledCoursesID.map(async (item) => {
            const response = await fetchCourseDetails(item);
            return response;
          })
        );
        setCourseDetails(details);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchEnrolledCoursesDetails();
  }, [enrolledCoursesID]);

  return (
    <div className="dashboard ">
      <Navbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Student Dashboard</h1>
        <h2 className="sub-heading">Enrolled Courses</h2>
        <ul className="course-list">
          {courseDetails.map((course, index) => (
            <div key={index} className="course-item">
              <h2>{course.title}</h2>
              <img
                src={course.image_480x270}
                alt={course.title}
                className="course-photo"
              />
              <h2 className="instructor">
                Instructor: {course.visible_instructors[0].name}
              </h2>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
