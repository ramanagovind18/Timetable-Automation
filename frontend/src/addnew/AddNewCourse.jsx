import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";

const AddNewCourse = ({ isOpen, onClose, onAddSuccess }) => {
  const [courseName, setCourseName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/courses/", {
        course_name: courseName,
      });
      onAddSuccess(); 
      onClose(false); 
    } catch (error) {
      console.error("Error adding new course:", error);
    }
  };

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="modal" onClick={() => onClose(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>Add New Course</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Course Name:
              <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
            </label>

            <div className="buttons">
              <button type="submit">Add</button>
              <button type="button" onClick={() => onClose(false)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </CSSTransition>
  );
};

export default AddNewCourse;
