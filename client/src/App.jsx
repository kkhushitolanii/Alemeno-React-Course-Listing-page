import CourseDetails from "./pages/CourseDetails/CourseDetails";
import CourseList from "./pages/CourseList/CourseList";
import Home from "./pages/Homepage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./services/auth/authServices";
import { ToastContainer } from "react-toastify";
import Login from "./services/auth/Login";
 
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courseList" element={<CourseList />} />
        <Route path="/courseList/:courseId" element={<CourseDetails />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/:user" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
