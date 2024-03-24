import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/classrooms.css";
import Sidebar from "./Sidebar";

const Classrooms = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchClassrooms();
  }, []);

  return (
    <div className="classrooms-page">
      <Sidebar />
      <div className="main-content">
        <div className="head">
          <h1>Classrooms</h1>
          <button className="add-classroom-btn">Add Classroom</button>
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

export default Classrooms;
