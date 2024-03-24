import React, { useState } from "react";
import axios from "axios";

const AddNewClass = ({ isOpen, onClose, onAddSuccess }) => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/classes/", {
        name,
        capacity
      });
      onAddSuccess();
      onClose();
    } catch (error) {
      console.error("Error adding new class:", error);
    }
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>Add New Class</h2>
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
              <button type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddNewClass;
