import React, { useState } from "react";
import axios from "axios";

const InstructorForm = () => {
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/instructors/", {
        uid: uid,
        name: name,
      });
      console.log("Instructor created successfully:", response.data);
      // Optionally, redirect or show a success message after successful form submission
    } catch (error) {
      console.error("Error creating instructor:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>UID:</label>
        <input
          type="text"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InstructorForm;
