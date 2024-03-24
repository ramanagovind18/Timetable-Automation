import React from "react";
import "../css/logout.css";

const Logout = () => {
  return (
    <div className="page">
      <h1>Logout</h1>
      <p>Are you sure you want to logout?</p>
      <button className="btn">Logout</button>
    </div>
  );
};

export default Logout;
