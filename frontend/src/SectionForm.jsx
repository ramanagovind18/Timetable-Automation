import React, { useState, useEffect } from "react";
import axios from "axios";

const SectionForm = () => {
  const [sectionId, setSectionId] = useState("");
  const [department, setDepartment] = useState("");
  const [numClasses, setNumClasses] = useState(0);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [meetingTimes, setMeetingTimes] = useState([]);
  const [selectedMeetingTime, setSelectedMeetingTime] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  useEffect(() => {
    // Fetch department, courses, meeting times, rooms, and instructors from the backend when the component mounts
    const fetchData = async () => {
      try {
        const deptResponse = await axios.get(
          "http://localhost:8000/api/departments/"
        );
        const coursesResponse = await axios.get(
          "http://localhost:8000/api/courses/"
        );
        const meetingTimesResponse = await axios.get(
          "http://localhost:8000/api/meeting_times/"
        );
        const roomsResponse = await axios.get(
          "http://localhost:8000/api/rooms/"
        );
        const instructorsResponse = await axios.get(
          "http://localhost:8000/api/instructors/"
        );

        setDepartment(deptResponse.data[0].dept_name);
        setCourses(coursesResponse.data);
        setMeetingTimes(meetingTimesResponse.data);
        setRooms(roomsResponse.data);
        setInstructors(instructorsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/sections/", {
        section_id: sectionId,
        department: department,
        num_class_in_week: numClasses,
        course: selectedCourse,
        meeting_time: selectedMeetingTime,
        room: selectedRoom,
        instructor: selectedInstructor,
      });
      console.log("Section created successfully:", response.data);
      // Optionally, redirect or show a success message after successful form submission
    } catch (error) {
      console.error("Error creating section:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Section ID:</label>
        <input
          type="text"
          value={sectionId}
          onChange={(e) => setSectionId(e.target.value)}
        />
      </div>
      <div>
        <label>Department:</label>
        <input type="text" value={department} readOnly />
      </div>
      <div>
        <label>Number of Classes in a Week:</label>
        <input
          type="number"
          value={numClasses}
          onChange={(e) => setNumClasses(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Course:</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.course_number} value={course.course_number}>
              {course.course_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Meeting Time:</label>
        <select
          value={selectedMeetingTime}
          onChange={(e) => setSelectedMeetingTime(e.target.value)}
        >
          <option value="">Select Meeting Time</option>
          {meetingTimes.map((meetingTime) => (
            <option key={meetingTime.pid} value={meetingTime.pid}>
              {meetingTime.day} - {meetingTime.time}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Room:</label>
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          <option value="">Select Room</option>
          {rooms.map((room) => (
            <option key={room.Room_number} value={room.Room_number}>
              {room.Room_number}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Instructor:</label>
        <select
          value={selectedInstructor}
          onChange={(e) => setSelectedInstructor(e.target.value)}
        >
          <option value="">Select Instructor</option>
          {instructors.map((instructor) => (
            <option key={instructor.uid} value={instructor.uid}>
              {instructor.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SectionForm;
