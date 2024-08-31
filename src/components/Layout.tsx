import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

const styles = {
  content: {
    marginLeft: "280px",
    marginTop: "60px",
    padding: "20px",
    minHeight: "calc(100vh - 60px)",
  },
};

export default Layout;
