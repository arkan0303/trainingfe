import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../componentsKaryawan/Navbar";
import Sidebar from "../../componentsKaryawan/Sidebar";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard" style={{ marginTop: "60px" }}>
      <Navbar />
      <div
        className="dashboard-container"
        style={{
          display: "flex",
          marginTop: "20px",
        }}
      >
        <Sidebar />
        <main
          className="dashboard-content"
          style={{
            marginLeft: "300px",
            padding: "20px",
            width: "100%",
            backgroundColor: "#ecf0f1",
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
