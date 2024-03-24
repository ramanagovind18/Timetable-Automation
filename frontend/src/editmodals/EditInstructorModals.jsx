import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import "./css/editinstructormodal.css";

const EditInstructorModal = ({ isOpen, onClose, instructor }) => {
  const [name, setName] = useState(instructor.name);
  const [email, setEmail] = useState(instructor.email);
  const [phone, setPhone] = useState(instructor.phone);
  const [department, setDepartment] = useState(instructor.department);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8000/api/instructors/${instructor.id}/`, {
        name,
        email,
        phone,
        department
      });
      onClose(true); // Close the modal and refresh the data
    } catch (error) {
      console.error("Error updating instructor:", error);
    }
  };

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="modal" onClick={() => onClose(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>Edit Instructor</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Phone:
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <label>
              Department:
              <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
            </label>
            <div className="buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={() => onClose(false)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </CSSTransition>
  );
};

export default EditInstructorModal;
