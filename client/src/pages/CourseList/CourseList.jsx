import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CourseList.css";
import { setCourses } from "../../redux/features/course/courseSlice";
import { fetchCourseDetailsAsync } from "../../redux/features/course/courseAction";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const courses = useSelector(setCourses);
  const courseList = courses.payload.courses.data;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const coursesToDisplay = courseList.slice(startIndex, endIndex);

  const navigateHandler = (courseId) => {
    dispatch(fetchCourseDetailsAsync(courseId));
    navigate(`/courseList/${courseId}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="courseList">
      <h1 className="heading">Course List</h1>
      <input
        value={itemsPerPage}
        type="number"
        placeholder="Enter of Courses per Page"
        min="1"
        max="100"
        onChange={(e) => setItemsPerPage(e.target.value)}
      />
      {coursesToDisplay.map((item, index) => (
        <div
          key={index}
          className="courseContainer"
          onClick={() => navigateHandler(item.id)}
        >
          <div className="image">
            <img src={item.image_480x270} alt="" />
          </div>
          <div className="content">
            <h1>{item.title}</h1>
            <p>{item.headline}</p>
            <p>{item.price}</p>
            <p>{item.visible_instructors[0].title}</p>
            <img src={item.visible_instructors[0].image_100x100} alt="" />
          </div>
        </div>
      ))}
      {/* Pagination UI */}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(courseList.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CourseList;
