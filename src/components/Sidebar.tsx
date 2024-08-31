import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBriefcase,
  FaChalkboardTeacher,
  FaBell,
  FaFileAlt,
} from "react-icons/fa"; // Import ikon dari react-icons

const Sidebar: React.FC = () => {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Menu Admin</h2>
      <ul style={styles.menu}>
        <li style={styles.menuItem}>
          <Link style={styles.link} to="/">
            <FaHome style={styles.icon} /> Dashboard
          </Link>
        </li>

        <li style={styles.menuItem}>
          <Link style={styles.link} to="/wawancara">
            <FaChalkboardTeacher style={styles.icon} /> Manajemen Wawancara
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link style={styles.link} to="/pelatihan">
            <FaChalkboardTeacher style={styles.icon} /> Manajemen Pelatihan
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link style={styles.link} to="/interview">
            <FaChalkboardTeacher style={styles.icon} /> Interview Follow Up
          </Link>
        </li>

        <li style={styles.menuItem}>
          <Link style={styles.link} to="/laporan">
            <FaFileAlt style={styles.icon} /> Laporan
          </Link>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    overflowY: "auto",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  },
  title: {
    margin: "0 0 20px 0",
    fontSize: "1.5em",
    textAlign: "center",
  },
  menu: {
    listStyleType: "none",
    padding: 0,
  },
  menuItem: {
    margin: "10px 0",
  },
  link: {
    color: "#ecf0f1",
    textDecoration: "none",
    fontSize: "1.2em",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "5px",
    transition: "background 0.3s, color 0.3s",
  },
  icon: {
    marginRight: "10px",
  },
  linkActive: {
    backgroundColor: "#34495e",
  },
  linkHover: {
    backgroundColor: "#34495e",
  },
};

export default Sidebar;
