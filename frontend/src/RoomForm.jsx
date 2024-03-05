import React, { useState } from "react";
import axios from "axios";

const RoomForm = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/rooms/", {
        room_number: roomNumber,
        seating_capacity: seatingCapacity,
      });
      console.log("Room created successfully:", response.data);
      // Optionally, redirect or show a success message after successful form submission
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Room Number:</label>
        <input
          type="text"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Seating Capacity:</label>
        <input
          type="number"
          value={seatingCapacity}
          onChange={(e) => setSeatingCapacity(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RoomForm;
