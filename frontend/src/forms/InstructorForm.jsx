import React, { useState } from "react";
import axios from "axios";

const InstructorForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/instructors/", {
        name,
        email,
        phone,
        department,
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
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label>Department:</label>
        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InstructorForm;
