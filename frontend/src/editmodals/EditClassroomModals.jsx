import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import "./css/editclassroommodal.css";

const EditClassroomModal = ({ isOpen, onClose, classroom }) => {
  const [roomNumber, setRoomNumber] = useState(classroom.room_number);
  const [seatingCapacity, setSeatingCapacity] = useState(classroom.seating_capacity);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8000/api/classrooms/${classroom.id}/`, {
        room_number: roomNumber,
        seating_capacity: seatingCapacity
      });
      onClose(true); // Close the modal and refresh the data
    } catch (error) {
      console.error("Error updating classroom:", error);
    }
  };

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="modal" onClick={() => onClose(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>Edit Classroom</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Room Number:
              <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
            </label>
            <label>
              Seating Capacity:
              <input type="number" value={seatingCapacity} onChange={(e) => setSeatingCapacity(e.target.value)} />
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

export default EditClassroomModal;
