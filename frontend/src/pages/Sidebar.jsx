import React from 'react';
import { Link } from "react-router-dom";
import "../css/sidebar.css";

function Sidebar(){
    return(
        <div className="sidebar">
          <h6> Timetable Automation ⁜</h6>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/instructors">Instructors</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/classrooms">Classrooms</Link></li> 
            <li><Link to="/classes">Classes</Link></li> 
            <li><Link to="/logout">Logout</Link></li> 
          </ul>
        </div>
    )
}

export default Sidebar;
