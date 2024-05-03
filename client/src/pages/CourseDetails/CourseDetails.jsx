import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CourseDetails.css";
import { selectCourseDetails } from "../../redux/features/course/courseSlice";
import faker from "faker";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import Navbar from "../../layouts/Navbar/Navbar";
import { isAuthenticated } from "../../redux/features/auth/authSlice";
import { handleEnrollmentAsync } from "../../redux/features/user/userAction";
import { toast } from "react-toastify";
import { selectUser } from "../../redux/features/auth/authSlice";
import { selectEnrolledCoursesID } from "../../redux/features/user/userSlice";

const CourseDetails = () => {
  const courseDetails = useSelector(selectCourseDetails);
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const isUserAuthenticated = useSelector(isAuthenticated);
  const [enroll, setEnroll] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const enrolledCoursesID = useSelector(selectEnrolledCoursesID);
   

  useEffect(() => {
    const enrollHandler = () => {
      if (courseDetails && enrolledCoursesID) {
        if (enrolledCoursesID.some((item) => item === courseDetails.id)) {
          setEnroll(true);
        } else {
          setEnroll(false);
        }
      }
    };

    enrollHandler();
  }, [enrolledCoursesID, courseDetails]);
  useEffect(() => {
    const numberOfWeeks = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
    const enrollments = ["open", "closed", "Inprogress"];
    const randomEnrollment =
      enrollments[Math.floor(Math.random() * enrollments.length)];
    const randomPercentage = Math.floor(Math.random() * 100) + 1;

    const generateSyllabus = (numberOfWeeks) => {
      const syllabus = [];
      for (let week = 1; week <= numberOfWeeks; week++) {
        const topic = faker.lorem.words();
        const content = faker.lorem.paragraph();
        syllabus.push({ week, topic, content });
      }
      return syllabus;
    };

    const syllabusData = generateSyllabus(numberOfWeeks);
    setGeneratedData({
      numberOfWeeks,
      randomEnrollment,
      randomPercentage,
      syllabusData,
    });
  }, []);

  if (!courseDetails || !courseDetails.visible_instructors || !generatedData) {
    return <div className="loading">Loading...</div>;
  }

  const instructor = courseDetails.visible_instructors[0];
  const { numberOfWeeks, randomEnrollment, randomPercentage, syllabusData } =
    generatedData;

  const enrollmentHandler = () => {
    if (isUserAuthenticated) {
      try {
        const response = dispatch(
          handleEnrollmentAsync(user, courseDetails.id)
        );
        console.log(`enroll Response ${response}`);
        setEnroll("Successfully Enrolled");
        toast.success("Successfully Enrolled");
      } catch (err) {
        console.log("enroll error", err);
      }
    } else {
      toast.error("Please Login to Enroll or Already got Enrolled ");
    }
  };

  return (
    <div className="courseDetails">
      <Navbar />
      <h1>CourseDetails</h1>
      <div className="courseDetails-details">
        {courseDetails && (
          <div className="section">
            <div className="topSection">
              <div>
                <h2>Title : {courseDetails.title}</h2>
                <h2>ID: {courseDetails.id}</h2>
                <h2>Price: {courseDetails.price}</h2>
                {instructor && <h2>Instructor: {instructor.name}</h2>}
                <h2>Duration {numberOfWeeks} weeks</h2>
                <h2>Enrollment : {randomEnrollment} </h2>
                {randomEnrollment === "Inprogress" && (
                  <div className="progressBarContainer">
                    <div
                      className="progressBar"
                      style={{ width: `${randomPercentage}%` }}
                    >
                      {randomPercentage}%
                    </div>
                  </div>
                )}
              </div>
              <div className="imgSection">
                <img
                  src={courseDetails.image_480x270}
                  alt={courseDetails.title}
                  className="coursePhoto"
                />
                {!enroll ? (
                  <button onClick={enrollmentHandler}>Enroll</button>
                ) : (
                  <button disabled>Already Enrolled</button>
                )}
              </div>
            </div>
            <h2>Syllabus</h2>
            <button
              onClick={() => setShowSyllabus(!showSyllabus)}
              className="syllabusButton"
            >
              {showSyllabus ? "Hide the syllabus" : "Show the syllabus"}
              {showSyllabus ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
            </button>
            <div
              className={`syllabus ${showSyllabus ? "expandSyllabus" : null}`}
            >
              {syllabusData.map((item, index) => (
                <div key={index}>
                  <h3>week {item.week}</h3>
                  <h3>topic : {item.topic}</h3>
                  <p>Content {item.content}</p>
                </div>
              ))}
              <p></p>
            </div>
            <h2>Instructor Details</h2>
            <p>
              {courseDetails.visible_instructors[0].job_title &&
                courseDetails.visible_instructors[0].name}
            </p>
            <img
              src={courseDetails.visible_instructors[0].image_100x100}
              alt={courseDetails.visible_instructors[0].name}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
