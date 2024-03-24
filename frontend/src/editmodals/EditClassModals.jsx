import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import "./css/editclassmodal.css";

const EditClassModal = ({ isOpen, onClose, classItem }) => {
  const [name, setName] = useState(classItem.name);
  const [capacity, setCapacity] = useState(classItem.capacity);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8000/api/classes/${classItem.id}/`, {
        name,
        capacity
      });
      onClose(true); // Close the modal and refresh the data
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="modal" onClick={() => onClose(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>Edit Class</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Capacity:
              <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
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

export default EditClassModal;
