import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import "../css/courses.css";
import Sidebar from "./Sidebar";
import EditCourseModal from "../editmodals/EditCourseModals.jsx";
import AddNewCourse from "../addnew/AddNewCourse.jsx";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios
      .get("http://localhost:8000/api/courses/")
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  const handleDeleteClick = (courseId) => {
    axios
      .delete(`http://localhost:8000/api/courses/${courseId}`)
      .then((response) => {
        console.log("Course deleted successfully");
        fetchCourses();
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
      });
  };

  const handleCloseModal = (refreshData) => {
    setShowEditModal(false);
    setSelectedCourse(null);
    if (refreshData) {
      fetchCourses();
    }
  };

  return (
    <div className="courses-page">
      <Sidebar />
      <div className="main-content">
        <div className="head">
          <h1>Courses</h1>
          <button onClick={() => setShowAddCourse(true)}>Add Course</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="courses-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={uuidv4()}>
                  <td>{course.course_code}</td>
                  <td>{course.course_name}</td>
                  <td>
                    <button onClick={() => handleEditClick(course)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteClick(course.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showEditModal && (
        <EditCourseModal
          isOpen={showEditModal}
          onClose={handleCloseModal}
          course={selectedCourse}
        />
      )}
      {showAddCourse && (
        <AddNewCourse
          isOpen={showAddCourse}
          onClose={() => setShowAddCourse(false)}
          onAddSuccess={fetchCourses}
        />
      )}
    </div>
  );
};

export default Courses;
