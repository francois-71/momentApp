// Import React and CSS
import React, { useState } from "react";
import "./logout.css";

const Logout = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to logout?</p>
          <button onClick={confirmLogout}>Yes</button>
          <button onClick={cancelLogout}>No</button>
        </div>
      )}
    </div>
  );
};

export default Logout;
