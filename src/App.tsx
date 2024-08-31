import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/ComponentsKaryawan/Dashboard";
import Profile from "./pages/ComponentsKaryawan/Profile";
import Settings from "./pages/ComponentsKaryawan/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wawancara from "./pages/Wawancara";
import PelatihanSaya from "./pages/ComponentsKaryawan/PelatihanSaya";
import ModulPelatihan from "./pages/ComponentsKaryawan/ModulPelatihan";
import InterviewUlang from "./pages/InterviewUlang";
import InterviewUlangg from "./pages/ComponentsKaryawan/InterviewUlang";
import LaporanTraining from "./pages/Laporan";

const App: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    console.log("Role from localStorage:", storedRole);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pelatihan" element={<About />} />
          <Route path="wawancara" element={<Wawancara />} />
          <Route path="interview" element={<InterviewUlang />} />
          <Route path="laporan" element={<LaporanTraining />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            role === "karyawan" ? <Dashboard /> : <Navigate to="/login" />
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<div>Dashboard Home Content</div>} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="pelatihan-saya" element={<PelatihanSaya />} />
          <Route path="module" element={<ModulPelatihan />} />
          <Route path="interview-fllow-ups" element={<InterviewUlangg />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
