import React, { useState } from "react";
import axios from "axios";

const AddNewClassroom = ({ isOpen, onClose, onAddSuccess }) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/classrooms/", {
        room_number: roomNumber,
        seating_capacity: seatingCapacity
      });
      onClose(false); // Close the modal
      onAddSuccess(); // Refresh the data
    } catch (error) {
      console.error("Error adding new classroom:", error);
    }
  };

  return (
    <div>
      {isOpen && (
        <div>
          <h2>Add New Classroom</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Room Number:
              <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
            </label>
            <label>
              Seating Capacity:
              <input type="number" value={seatingCapacity} onChange={(e) => setSeatingCapacity(e.target.value)} />
            </label>
            <button type="submit">Add Classroom</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddNewClassroom;
