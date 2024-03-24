import React, { useState, useEffect } from "react";
import axios from "axios";

const TIME_SLOTS = [
  ["8:00 - 8:50", "8:50 - 9:40"],
  ["9:40 - 10:30", "10:45 - 11:30"],
  ["12:05 - 12:50", "12:50 - 1:35"],
  ["1:45 - 2:30", "2:30 - 3:15"],
];

const CourseForm = () => {
  const [courseNumber, setCourseNumber] = useState("");
  const [courseName, setCourseName] = useState("");
  const [maxStudents, setMaxStudents] = useState("");
  const [preferredDay, setPreferredDay] = useState("");
  const [preferredStartTime, setPreferredStartTime] = useState("");
  const [preferredEndTime, setPreferredEndTime] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/instructors/"
      );
      setInstructors(response.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/courses/", {
        course_number: courseNumber,
        course_name: courseName,
        max_students: maxStudents,
        instructors: selectedInstructors,
        preferred_day: preferredDay,
        preferred_start_time: preferredStartTime,
        preferred_end_time: preferredEndTime,
      });
      console.log("Course created successfully:", response.data);
      // Optionally, redirect or show a success message after successful form submission
    } catch (error) {
      // console.error("Error creating course:", error);
      console.error("Error creating course:", error);
      console.log("Request data:", {
        course_number: courseNumber,
        course_name: courseName,
        max_students: maxStudents,
        preferred_day: preferredDay,
        preferred_start_time: preferredStartTime,
        preferred_end_time: preferredEndTime,
        instructors: selectedInstructors,
      });
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
        <label>Max Students:</label>
        <input
          type="number"
          value={maxStudents}
          onChange={(e) => setMaxStudents(e.target.value)}
        />
      </div>
      <div>
        <label>Instructor:</label>
        <select
          multiple // Allow multiple selections
          value={selectedInstructors}
          onChange={(e) =>
            setSelectedInstructors(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          <option value="">Select instructors</option>
          {instructors.map((instructor) => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Preferred Day:</label>
        <select
          value={preferredDay}
          onChange={(e) => setPreferredDay(e.target.value)}
        >
          <option value="">Select a day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>
      </div>
      <div>
        <label>Preferred Start Time:</label>
        <select
          value={preferredStartTime}
          onChange={(e) => setPreferredStartTime(e.target.value)}
        >
          <option value="">Select a start time</option>
          {TIME_SLOTS.map((timeSlot, index) => (
            <option key={index} value={timeSlot[0]}>
              {timeSlot[0]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Preferred End Time:</label>
        <select
          value={preferredEndTime}
          onChange={(e) => setPreferredEndTime(e.target.value)}
        >
          <option value="">Select an end time</option>
          {TIME_SLOTS.map((timeSlot, index) => (
            <option key={index} value={timeSlot[1]}>
              {timeSlot[1]}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CourseForm;
