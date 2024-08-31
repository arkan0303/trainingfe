import React from "react";
import { useNavigate } from "react-router-dom"; // Use this for navigation

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
    <div style={styles.navbar}>
      <h1 style={styles.title}>Sistem Penjadwalan Training PT AQUA</h1>
      <button style={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  navbar: {
    width: "calc(100% - 250px)",
    height: "60px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 250,
    zIndex: 1000,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    padding: "0 20px",
    justifyContent: "space-between",
  },
  title: {
    margin: "0",
  },
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
