import React, { useState } from "react";
import axios from "axios";

const AddNewCourse = ({ isOpen, onClose, onAddSuccess }) => {
  const [formData, setFormData] = useState({
    course_code: "",
    course_name: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/courses/", formData)
      .then(response => {
        console.log("Course added successfully");
        onAddSuccess();
        onClose(); 
      })
      .catch(error => {
        console.error("Error adding course:", error);
      });
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <h2>Add New Course</h2>
          <form onSubmit={handleSubmit}>
            <label>Course Code:</label>
            <input type="text" name="course_code" value={formData.course_code} onChange={handleChange} required />
            <label>Course Name:</label>
            <input type="text" name="course_name" value={formData.course_name} onChange={handleChange} />
            <div className="buttons">
              <button type="submit">Add</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddNewCourse;
