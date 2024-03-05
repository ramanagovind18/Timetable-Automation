import React from "react";
import RoomForm from "./RoomForm.jsx";
import InstructorForm from "./InstructorForm.jsx";
import MeetingTimeForm from "./MeetingTimeForm.jsx";
import CourseForm from "./CourseForm.jsx";

const App = () => {
  return (
    <div>
      <h1>Add New Room</h1>
      <RoomForm />

      <h1>Add New Instructor</h1>
      <InstructorForm />

      <h1>Add New Meeting Time</h1>
      <MeetingTimeForm />

      <h1>Add New Course</h1>
      <CourseForm />
    </div>
  );
};

export default App;
