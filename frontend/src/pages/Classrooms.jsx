import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/classrooms.css";
import Sidebar from "./Sidebar";
import EditClassroomModal from "../editmodals/EditClassroomModals.jsx";
import AddNewClassroom from "../addnew/AddNewClassroom.jsx";

const Classrooms = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [showAddClassroom, setShowAddClassroom] = useState(false);

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/classrooms/");
      setClassrooms(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
      setLoading(false);
    }
  };

  const handleEditClick = (classroom) => {
    setSelectedClassroom(classroom);
    setShowEditModal(true);
  };

  const handleDeleteClick = (classroomId) => {
    axios.delete(`http://localhost:8000/api/classrooms/${classroomId}`)
      .then(response => {
        console.log("Classroom deleted successfully");
        fetchClassrooms(); // Fetch updated classrooms data
      })
      .catch(error => {
        console.error("Error deleting classroom:", error);
      });
  };

  const handleCloseModal = (refreshData) => {
    setShowEditModal(false);
    setSelectedClassroom(null);
    if (refreshData) {
      fetchClassrooms();
    }
  };

  return (
    <div className="classrooms-page">
      <Sidebar />
      <div className="main-content">
        <div className="head">
          <h1>Classrooms</h1>
          <button onClick={() => setShowAddClassroom(true)}>Add Classroom</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="classrooms-table">
            <thead>
              <tr>
                <th>Room</th>
                <th>Capacity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classrooms.map((classroom) => (
                <tr key={classroom.room_number}>
                  <td>{classroom.room_number}</td>
                  <td>{classroom.seating_capacity}</td>
                  <td>
                    <button onClick={() => handleEditClick(classroom)}>Edit</button>
                    <button onClick={() => handleDeleteClick(classroom.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showEditModal && (
        <EditClassroomModal
          isOpen={showEditModal}
          onClose={handleCloseModal}
          classroom={selectedClassroom}
        />
      )}
      {showAddClassroom && (
        <AddNewClassroom
          isOpen={showAddClassroom}
          onClose={() => setShowAddClassroom(false)}
          onAddSuccess={fetchClassrooms}
        />
      )}
    </div>
  );
};

export default Classrooms;
