import React from "react";
import "../css/classes.css"; // Assuming you have a CSS file for styling
import Sidebar from "./Sidebar";

const Classes = () => {
  const classes = [
    { id: 1, name: "Class A", capacity: 30 },
    { id: 2, name: "Class B", capacity: 25 },
    { id: 3, name: "Class C", capacity: 20 },
  ];

  return (
    <div className="classes-page">
      <Sidebar />
      <div className="main-content">
        <div className="head">
          <h1>Classes</h1>
          <button className="add-class-btn">Add Class</button>
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
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Classes;
