import React, { useState } from "react";
import axios from "axios";

const MeetingTimeForm = () => {
  const [pid, setPid] = useState("");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/meeting_times/", {
        pid: pid,
        time: time,
        day: day,
      });
      console.log("Meeting time created successfully:", response.data);
      // Optionally, redirect or show a success message after successful form submission
    } catch (error) {
      console.error("Error creating meeting time:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>PID:</label>
        <input
          type="text"
          value={pid}
          onChange={(e) => setPid(e.target.value)}
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div>
        <label>Day:</label>
        <input
          type="text"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MeetingTimeForm;
