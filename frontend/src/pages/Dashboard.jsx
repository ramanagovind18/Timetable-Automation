import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";
import "../css/dashboard.css"; 

const Dashboard = () => {
  const [instructorsCount, setInstructorsCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [classroomsCount, setClassroomsCount] = useState(0);
  const [classesCount, setClassesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructorsResponse = await axios.get("http://localhost:8000/api/instructors/");
        setInstructorsCount(instructorsResponse.data.length);

        const coursesResponse = await axios.get("http://localhost:8000/api/courses/");
        setCoursesCount(coursesResponse.data.length);

        const classroomsResponse = await axios.get("http://localhost:8000/api/classrooms/");
        setClassroomsCount(classroomsResponse.data.length);
        
        const classesResponse = await axios.get("http://localhost:8000/api/classes/");
        setClassesCount(classesResponse.data.length);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <div className="head">
          <h1>Dashboard</h1>
          <h6>🐱‍🚀</h6>
        </div>

        <div className="stats">
          <div className="stat-item">
            <h3>Instructors</h3>
            {loading ? <p>Loading...</p> : <p>{instructorsCount}</p>}
          </div>
          <div className="stat-item">
            <h3>Courses</h3>
            {loading ? <p>Loading...</p> : <p>{coursesCount}</p>}
          </div>
          <div className="stat-item">
            <h3>ClassRooms</h3>
            {loading ? <p>Loading...</p> : <p>{classroomsCount}</p>}
          </div>
          <div className="stat-item">
            <h3>Classes</h3>
            {loading ? <p>Loading...</p> : <p>{classesCount}</p>}
          </div>
        </div>
        
<div className="generate-timetable-btn">
  <button>Generate Timetables</button>  
</div>


<table className="timetable-table">
  <thead>
    <tr>
      <th>Timetable Name</th>
      <th>Status</th>
      <th>Print</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CSBS - A</td>
      <td>Completed</td>
      <td><button>Print</button></td>
    </tr>
  </tbody>
</table>
</div>
</div>
);
};

export default Dashboard;

        
