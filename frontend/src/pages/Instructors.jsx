import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/instructors.css";
import Sidebar from "./Sidebar";
import EditInstructorModal from "../editmodals/EditInstructorModals.jsx";
import AddNewInstructor from "../addnew/AddNewInstructor.jsx"; 

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [showAddInstructor, setShowAddInstructor] = useState(false); 

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = () => {
    axios.get("http://localhost:8000/api/instructors/")
      .then(response => {
        setInstructors(response.data);
      })
      .catch(error => {
        console.error("Error fetching instructors:", error);
      });
  };

  const handleEditClick = (instructor) => {
    setSelectedInstructor(instructor);
    setShowEditModal(true);
  };

  const handleDeleteClick = (instructorId) => {
    axios.delete(`http://localhost:8000/api/instructors/${instructorId}`)
      .then(response => {
        console.log("Instructor deleted successfully");
        fetchInstructors(); // Fetch updated instructors data
      })
      .catch(error => {
        console.error("Error deleting instructor:", error);
      });
  };

  const handleCloseModal = (refreshData) => {
    setShowEditModal(false);
    setSelectedInstructor(null);
    if (refreshData) {
      fetchInstructors(); // Fetch updated instructors data
    }
  };

  return (
    <div className="instructors-page">
      <Sidebar />
      <div className="main-content">
        <div className="head">
          <h1>Instructors</h1>
          <button onClick={() => setShowAddInstructor(true)}>Add Instructor</button>
        </div>
        <table className="instructors-table">
          <thead>
            <tr>
              <th>Instructor Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map(instructor => (
              <tr key={instructor.id}>
                <td>{instructor.name}</td>
                <td>{instructor.email}</td>
                <td>{instructor.phone}</td>
                <td>{instructor.department}</td>
                <td>
                  <button onClick={() => handleEditClick(instructor)}>Edit</button>
                  <button onClick={() => handleDeleteClick(instructor.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEditModal && (
        <EditInstructorModal
          isOpen={showEditModal}
          onClose={handleCloseModal}
          instructor={selectedInstructor}
        />
      )}
      {showAddInstructor && (
        <AddNewInstructor
          isOpen={showAddInstructor}
          onClose={() => setShowAddInstructor(false)}
          onAddSuccess={fetchInstructors}
        />
      )}
    </div>
  );
};

export default Instructors;
