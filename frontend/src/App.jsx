import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Instructors from './pages/Instructors';
import Courses from './pages/Courses';
import Classrooms from './pages/Classrooms'; 
import Classes from './pages/Classes'; 
import Logout from './pages/Logout'; 
import Timetable from './pages/Timetable';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/Classrooms" element={<Classrooms />} /> 
        <Route path="/classes" element={<Classes />} /> 
        <Route path="/timetable" element ={<Timetable />} />
        <Route path="/logout" element={<Logout />} /> 
      </Routes>
    </Router>
  );
};

export default App;
