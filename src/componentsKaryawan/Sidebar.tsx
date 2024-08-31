import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaBell,
  FaFileAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  const [showWawancara, setShowWawancara] = useState(false);
  const [showPelatihan, setShowPelatihan] = useState(false);
  const [showLaporan, setShowLaporan] = useState(false);

  const toggleDropdown = (section: string) => {
    if (section === "wawancara") {
      setShowWawancara(!showWawancara);
    } else if (section === "pelatihan") {
      setShowPelatihan(!showPelatihan);
    } else if (section === "laporan") {
      setShowLaporan(!showLaporan);
    }
  };

  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav
      className="sidebar"
      style={{
        width: "250px",
        backgroundColor: "#2c3e50",
        padding: "20px",
        position: "fixed",
        height: "100vh",
        color: "#ecf0f1",
        top: 0,
        left: 0,
      }}
    >
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {/* <li style={{ marginBottom: "20px" }}>
          <Link
            to="/dashboard/home"
            style={{
              textDecoration: "none",
              color: "#ecf0f1",
              fontSize: "18px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaHome style={{ marginRight: "10px" }} /> Dashboard
          </Link>
        </li> */}
        <li style={{ marginBottom: "20px" }}>
          <Link
            to="/dashboard/profile"
            style={{
              textDecoration: "none",
              color: "#ecf0f1",
              fontSize: "18px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaUser style={{ marginRight: "10px" }} /> hasil wawancara
          </Link>
        </li>

        <li style={{ marginBottom: "20px" }}>
          <div
            style={{
              cursor: "pointer",
              color: "#ecf0f1",
              fontSize: "18px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => toggleDropdown("pelatihan")}
          >
            <FaChalkboardTeacher style={{ marginRight: "10px" }} /> Pelatihan
            {showPelatihan ? (
              <FaChevronUp style={{ marginLeft: "auto" }} />
            ) : (
              <FaChevronDown style={{ marginLeft: "auto" }} />
            )}
          </div>
          {showPelatihan && (
            <ul
              style={{ listStyleType: "none", paddingLeft: "20px", margin: 0 }}
            >
              <li style={{ marginBottom: "10px" }}>
                <Link
                  to="/dashboard/pelatihan-saya"
                  style={{
                    textDecoration: "none",
                    color: "#ecf0f1",
                    fontSize: "16px",
                  }}
                >
                  Pelatihan Saya
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/module"
                  style={{
                    textDecoration: "none",
                    color: "#ecf0f1",
                    fontSize: "16px",
                  }}
                >
                  Modul Pelatihan
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li style={{ marginBottom: "20px" }}>
          <Link
            to="/dashboard/interview-fllow-ups"
            style={{
              textDecoration: "none",
              color: "#ecf0f1",
              fontSize: "18px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaBell style={{ marginRight: "10px" }} /> Notifikasi
          </Link>
        </li>

        {/* <li style={{ marginBottom: "20px" }}>
          <div
            style={{
              cursor: "pointer",
              color: "#ecf0f1",
              fontSize: "18px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => toggleDropdown("laporan")}
          >
            <FaFileAlt style={{ marginRight: "10px" }} /> Laporan
            {showLaporan ? (
              <FaChevronUp style={{ marginLeft: "auto" }} />
            ) : (
              <FaChevronDown style={{ marginLeft: "auto" }} />
            )}
          </div>
          {showLaporan && (
            <ul
              style={{ listStyleType: "none", paddingLeft: "20px", margin: 0 }}
            >
              <li style={{ marginBottom: "10px" }}>
                <Link
                  to="/dashboard/reports/saya"
                  style={{
                    textDecoration: "none",
                    color: "#ecf0f1",
                    fontSize: "16px",
                  }}
                >
                  Laporan Saya
                </Link>
              </li>
            </ul>
          )}
        </li> */}
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </ul>
    </nav>
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

export default Sidebar;
