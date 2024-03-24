import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/courses.css";
import Sidebar from "./Sidebar";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/courses/");
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="courses-page">
      <Sidebar />
      <div className="main-content">
        <div className="head">
          <h1>Courses</h1>
        </div>
        <div className="search">           
          <div className="search-box">
            <input type="text" placeholder="Search..." />
          </div>
          <button className="add-course-btn">Add Course</button>
        </div> 
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="courses-table">
            <thead>
              <tr>
                <th>Course Number</th>
                <th>Course Name</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.course_number}>
                  <td>{course.course_number}</td>
                  <td>{course.course_name}</td>

                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Courses;
