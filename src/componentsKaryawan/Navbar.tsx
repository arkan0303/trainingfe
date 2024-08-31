import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");
  };
  return (
    <div>
      <header
        className="navbar"
        style={{
          backgroundColor: "#34495e",
          color: "#ecf0f1",
          padding: "15px 30px",
          textAlign: "center",
          position: "fixed",
          width: "100%",
          top: 0,
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px" }}>Employee Dashboard</h1>
      </header>
      <button style={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  logoutButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "16px",
    outline: "none",
    marginRight: "3rem",
  },
};

export default Navbar;
