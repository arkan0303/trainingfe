import React, { useState, useEffect } from "react";
import axios from "axios";

const InterviewUlang = () => {
  const [employees, setEmployees] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    interviewId: "",
    followupDate: "",
    result: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    // Fetch employees and interviews
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/employees"
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const fetchInterviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/interviews"
        );
        setInterviews(response.data);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };

    fetchEmployees();
    fetchInterviews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      await axios.post(
        "http://localhost:5000/api/v1/interview-followups",
        formData
      );
      setMessage("Interview follow-up submitted successfully!");
      setMessageType("success");
    } catch (error) {
      setMessage("Error submitting interview follow-up.");
      setMessageType("error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h4>Interview Follow-up Form</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="employeeId" style={styles.label}>
            Employee
          </label>
          <select
            id="employeeId"
            name="employeeId"
            style={styles.select}
            value={formData.employeeId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select an Employee
            </option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.email}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="interviewId" style={styles.label}>
            Interview
          </label>
          <select
            id="interviewId"
            name="interviewId"
            style={styles.select}
            value={formData.interviewId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select an Interview
            </option>
            {interviews.map((interview) => (
              <option key={interview.id} value={interview.id}>
                {interview.questions}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="followupDate" style={styles.label}>
            Follow-up Date
          </label>
          <input
            type="datetime-local"
            id="followupDate"
            name="followupDate"
            style={styles.input}
            value={formData.followupDate}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="result" style={styles.label}>
            Result
          </label>
          <textarea
            id="result"
            name="result"
            style={styles.textarea}
            rows="3"
            value={formData.result}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" style={styles.button}>
          Submit
        </button>

        {message && (
          <div style={{ ...styles.message, ...styles[messageType] }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

// Styles object
const styles = {
  container: {
    padding: "2rem",
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  select: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  message: {
    textAlign: "center",
    marginTop: "1rem",
    fontWeight: "bold",
  },
  success: {
    color: "green",
  },
  error: {
    color: "red",
  },
};

export default InterviewUlang;
