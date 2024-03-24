import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/classes.css"; 
import Sidebar from "./Sidebar";
import EditClassModal from "../editmodals/EditClassModals";
import AddNewClass from "../addnew/AddNewClass";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showAddClass, setShowAddClass] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = () => {
    axios.get("http://localhost:8000/api/classes/")
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error("Error fetching classes:", error);
      });
  };

  const handleEditClick = (classItem) => {
    setSelectedClass(classItem);
    setShowEditModal(true);
  };

  const handleDeleteClick = (classId) => {
    axios.delete(`http://localhost:8000/api/classes/${classId}`)
      .then(response => {
        console.log("Class deleted successfully");
        fetchClasses(); // Fetch updated classes data
      })
      .catch(error => {
        console.error("Error deleting class:", error);
      });
  };

  const handleCloseModal = (refreshData) => {
    setShowEditModal(false);
    setSelectedClass(null);
    if (refreshData) {
      fetchClasses(); // Fetch updated classes data
    }
  };

  return (
    <div className="classes-page">
      <Sidebar />
      <div className="main-content">
        <div className="head">
          <h1>Classes</h1>
          <button onClick={() => setShowAddClass(true)}>Add Class</button>
        </div>
        <table className="classes-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem.id}>
                <td>{classItem.name}</td>
                <td>{classItem.capacity}</td>
                <td>
                  <button onClick={() => handleEditClick(classItem)}>Edit</button>
                  <button onClick={() => handleDeleteClick(classItem.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEditModal && (
        <EditClassModal
          isOpen={showEditModal}
          onClose={handleCloseModal}
          classItem={selectedClass}
        />
      )}
      {showAddClass && (
        <AddNewClass
          isOpen={showAddClass}
          onClose={() => setShowAddClass(false)}
          onAddSuccess={fetchClasses}
        />
      )}
    </div>
  );
};

export default Classes;
