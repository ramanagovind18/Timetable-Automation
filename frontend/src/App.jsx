import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Instructors from './pages/Instructors';
import Courses from './pages/Courses';
import Classrooms from './pages/Classrooms'; // Import Rooms component
import Classes from './pages/Classes'; // Import Classes component
import Logout from './pages/Logout'; // Import Logout component


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/Classrooms" element={<Classrooms />} /> {/* Add Route for Rooms */}
        <Route path="/classes" element={<Classes />} /> {/* Add Route for Classes */}
        <Route path="/logout" element={<Logout />} /> {/* Add Route for Logout */}
      </Routes>
    </Router>
  );
};

export default App;
