import React, { useState, useEffect } from "react";
import axios from "axios";

const InterviewUlangg: React.FC = () => {
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const userId = localStorage.getItem("id"); // Ambil userId dari localStorage
      if (!userId) {
        setError("User ID is not found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/employees-user/${userId}`
        );
        setEmployee(response.data);
      } catch (err) {
        setError("Failed to fetch employee data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  if (!employee) return <p>No employee data available.</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Employee Details</h1>
      <div style={styles.card}>
        <h2 style={styles.subHeader}>User: {employee.user.name}</h2>
        <p style={styles.text}>
          <strong>Plant:</strong> {employee.plant}
        </p>

        <h3 style={styles.subHeader}>Trainings</h3>
        {employee.employeeTrainings.length > 0 ? (
          employee.employeeTrainings.map((training: any) => (
            <div key={training.id} style={styles.subCard}>
              <p style={styles.text}>
                <strong>Training Type:</strong> {training.training.trainingType}
              </p>
              <p style={styles.text}>
                <strong>Training Date:</strong>{" "}
                {new Date(training.training.trainingDate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p style={styles.text}>No training information available.</p>
        )}

        <h3 style={styles.subHeader}>Interview Follow-ups</h3>
        {employee.interviewFollowups.length > 0 ? (
          employee.interviewFollowups.map((followup: any) => (
            <div key={followup.id} style={styles.subCard}>
              <p style={styles.text}>
                <strong>Follow-up Date:</strong>{" "}
                {new Date(followup.followupDate).toLocaleString()}
              </p>
              <p style={styles.text}>
                <strong>Result:</strong> {followup.result}
              </p>
            </div>
          ))
        ) : (
          <p style={styles.text}>
            No interview follow-up information available.
          </p>
        )}
      </div>
    </div>
  );
};

// Custom inline styles
const styles = {
  container: {
    padding: "2rem",
    maxWidth: "800px",
    margin: "auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  subHeader: {
    marginTop: "1.5rem",
    marginBottom: "0.75rem",
    color: "#555",
  },
  card: {
    padding: "1.5rem",
    marginBottom: "1.5rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  subCard: {
    padding: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "6px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  text: {
    margin: "0.5rem 0",
    color: "#333",
  },
  loading: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#007bff",
  },
  error: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#dc3545",
  },
};

export default InterviewUlangg;
