import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseForm = () => {
  const [courseNumber, setCourseNumber] = useState("");
  const [courseName, setCourseName] = useState("");
  const [maxStudents, setMaxStudents] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);

  useEffect(() => {
    // Fetch instructors from the backend when the component mounts
    const fetchInstructors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/instructors/"
        ); // Adjust the API endpoint as needed
        setInstructors(response.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/courses/", {
        course_number: courseNumber,
        course_name: courseName,
        max_numb_students: maxStudents,
        instructors: selectedInstructors.map((instructor) => instructor?.id),
      });
      console.log("Course created successfully:", response.data);
      // Optionally, redirect or show a success message after successful form submission
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Course Number:</label>
        <input
          type="text"
          value={courseNumber}
          onChange={(e) => setCourseNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Course Name:</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </div>
      <div>
        <label>Max Number of Students:</label>
        <input
          type="text"
          value={maxStudents}
          onChange={(e) => setMaxStudents(e.target.value)}
        />
      </div>
      <div>
        <label>Instructors:</label>
        <select
          multiple
          value={selectedInstructors.map((instructor) => instructor.id)}
          onChange={(e) => {
            const selectedIds = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            setSelectedInstructors(
              instructors.filter((instructor) =>
                selectedIds.includes(instructor.id.toString())
              )
            );
          }}
        >
          {instructors.map((instructor) => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CourseForm;
