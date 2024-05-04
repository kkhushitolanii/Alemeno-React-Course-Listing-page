Alemeno-React-Course-Listing-page


Getting Started

Prerequisites Make sure you have the following installed: Node.js MongoDB

Installation and Setup Clone the repository using the following command:


Frontend

Navigate to the client folder: cd client

Install dependencies: npm install

Start the frontend server: npm run dev The frontend will be running at http://localhost:5173.

Backend Open a new terminal window.

Navigate to the server folder: cd server

Install dependencies: npm install

Start the backend server using nodemon: nodemon index.js

The server will be running at http://localhost:3000, and the MongoDB database will be accessible at mongodb://localhost:27017.

API Endpoints Authentication: Login: POST http://localhost:3000/auth/login Register: POST http://localhost:3000/auth/register Course Operations: Get Courses List: GET http://localhost:3000/api/courses Get Course Details: GET http://localhost:3000/api/courses/:courseID Enrollment Actions: Enroll in a Course: POST http://localhost:3000/api/enrollment Get Enrolled Courses: GET http://localhost:3000/api/enrollment/:user

Usage Access the provided authentication endpoints to log in or register new users. Use the course-related endpoints to retrieve the list of available courses and their details. Enroll in courses using the enrollment endpoint, and check enrolled courses using the corresponding endpoint.

Video demonstration link-
https://drive.google.com/file/d/1wwSbL9-vDJu6acIktTwudCSO20qt1wFc/view?usp=sharing
