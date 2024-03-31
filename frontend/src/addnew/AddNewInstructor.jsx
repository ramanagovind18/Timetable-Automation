import React, { useState } from "react";
import axios from "axios";

const AddNewInstructor = ({ isOpen, onClose, onAddSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: ""
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
    axios.post("http://localhost:8000/api/instructors/", formData)
      .then(response => {
        console.log("Instructor added successfully");
        onAddSuccess();
        onClose(); 
      })
      .catch(error => {
        console.error("Error adding instructor:", error);
      });
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <h2>Add New Instructor</h2>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            <label>Phone:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            <label>Department:</label>
            <input type="text" name="department" value={formData.department} onChange={handleChange} />
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

export default AddNewInstructor;
