import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface EmployeeTraining {
  id: number;
  employeeId: number;
  trainingId: number;
  scheduledDate: string;
  completionStatus: string;
  createdAt: string;
  updatedAt: string;
}

interface Employee {
  id: number;
  userId: number;
  email: string;
  plant: string;
  position: string;
  interviewStatus: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  employeeTrainings: EmployeeTraining[];
}

const LaporanTraining: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/employees")
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const containerStyle: React.CSSProperties = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle: React.CSSProperties = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "0 auto",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const thTdStyle: React.CSSProperties = {
    padding: "10px",
    textAlign: "left",
    border: "1px solid #ddd",
  };

  const thStyle: React.CSSProperties = {
    ...thTdStyle,
    backgroundColor: "#f4f4f4",
    color: "#333",
  };

  const evenRowStyle: React.CSSProperties = {
    backgroundColor: "#f9f9f9",
  };

  const hoverRowStyle: React.CSSProperties = {
    backgroundColor: "#f1f1f1",
  };

  const loadingStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: "18px",
    marginTop: "20px",
    color: "#007bff",
  };

  const errorStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: "18px",
    marginTop: "20px",
    color: "#dc3545",
  };

  if (loading) return <div style={loadingStyle}>Loading...</div>;
  if (error) return <div style={errorStyle}>{error}</div>;

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Employee Training Report</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Plant</th>
            <th style={thStyle}>Position</th>
            <th style={thStyle}>Training Scheduled Date</th>
            <th style={thStyle}>Completion Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.flatMap((employee) =>
            employee.employeeTrainings.map((training, index) => (
              <tr
                key={training.id}
                style={index % 2 === 0 ? evenRowStyle : undefined}
              >
                <td style={thTdStyle}>{employee.id}</td>
                <td style={thTdStyle}>{employee.user.name}</td>
                <td style={thTdStyle}>{employee.email}</td>
                <td style={thTdStyle}>{employee.plant}</td>
                <td style={thTdStyle}>{employee.position}</td>
                <td style={thTdStyle}>
                  {new Date(training.scheduledDate).toLocaleDateString()}
                </td>
                <td style={thTdStyle}>{training.completionStatus}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LaporanTraining;
