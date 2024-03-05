import React, { useState } from "react";
import axios from "axios";

const DepartmentForm = () => {
  const [deptName, setDeptName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/departments/", {
        dept_name: deptName,
      });
      console.log("Department created successfully:", response.data);
      // Optionally, redirect or show a success message after successful form submission
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Department Name:</label>
        <input
          type="text"
          value={deptName}
          onChange={(e) => setDeptName(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DepartmentForm;
