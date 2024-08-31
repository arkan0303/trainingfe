import React, { useState, useEffect } from "react";
import axios from "axios";

interface TrainingFormData {
  trainingType: string;
  trainingDate: string;
  location: string;
}

interface EmployeeTrainingFormData {
  employeeId: number;
  trainingId: number;
  scheduledDate: string;
  completionStatus: string;
}

interface TrainingModuleFormData {
  trainingId: number;
  moduleName: string;
  moduleType: string;
  moduleUrl: string;
}

interface Employee {
  id: number;
  email: string;
}

interface Training {
  id: number;
  trainingType: string;
}

const About: React.FC = () => {
  // State for Training Form
  const [trainingFormData, setTrainingFormData] = useState<TrainingFormData>({
    trainingType: "",
    trainingDate: "",
    location: "",
  });
  const [trainingError, setTrainingError] = useState<string | null>(null);

  // State for Employee Training Form
  const [employeeTrainingFormData, setEmployeeTrainingFormData] =
    useState<EmployeeTrainingFormData>({
      employeeId: 0,
      trainingId: 0,
      scheduledDate: "",
      completionStatus: "Pending",
    });
  const [employeeTrainingError, setEmployeeTrainingError] = useState<
    string | null
  >(null);

  // State for Training Module Form
  const [trainingModuleFormData, setTrainingModuleFormData] =
    useState<TrainingModuleFormData>({
      trainingId: 0,
      moduleName: "",
      moduleType: "",
      moduleUrl: "",
    });
  const [trainingModuleError, setTrainingModuleError] = useState<string | null>(
    null
  );

  // State for dropdown options
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    // Fetch employees and trainings when the component mounts
    const fetchEmployeesAndTrainings = async () => {
      try {
        const [employeesResponse, trainingsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/v1/employees"),
          axios.get("http://localhost:5000/api/v1/trainings"),
        ]);

        setEmployees(employeesResponse.data);
        setTrainings(trainingsResponse.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchEmployeesAndTrainings();
  }, []);

  // Handle Training Form Change
  const handleTrainingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTrainingFormData({ ...trainingFormData, [name]: value });
  };

  // Handle Employee Training Form Change
  const handleEmployeeTrainingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEmployeeTrainingFormData({
      ...employeeTrainingFormData,
      [name]:
        name === "employeeId" || name === "trainingId"
          ? parseInt(value)
          : value,
    });
  };

  // Handle Training Module Form Change
  const handleTrainingModuleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTrainingModuleFormData({
      ...trainingModuleFormData,
      [name]: name === "trainingId" ? parseInt(value) : value,
    });
  };

  // Handle Training Form Submit
  const handleTrainingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedDate = new Date(
        trainingFormData.trainingDate
      ).toISOString();
      await axios.post("http://localhost:5000/api/v1/trainings", {
        ...trainingFormData,
        trainingDate: formattedDate,
      });
      alert("Training data submitted successfully!");
      setTrainingFormData({ trainingType: "", trainingDate: "", location: "" });
    } catch (err) {
      setTrainingError("Failed to submit training data");
      console.error(err);
    }
  };

  // Handle Employee Training Form Submit
  const handleEmployeeTrainingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedDate = new Date(
        employeeTrainingFormData.scheduledDate
      ).toISOString();
      await axios.post("http://localhost:5000/api/v1/employee-trainings", {
        ...employeeTrainingFormData,
        scheduledDate: formattedDate,
      });
      alert("Employee training data submitted successfully!");
      setEmployeeTrainingFormData({
        employeeId: 0,
        trainingId: 0,
        scheduledDate: "",
        completionStatus: "Pending",
      });
    } catch (err) {
      setEmployeeTrainingError("Failed to submit employee training data");
      console.error(err);
    }
  };

  // Handle Training Module Form Submit
  const handleTrainingModuleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append(
        "trainingId",
        trainingModuleFormData.trainingId.toString()
      );
      formData.append("moduleName", trainingModuleFormData.moduleName);
      formData.append("moduleType", trainingModuleFormData.moduleType);
      formData.append("file", trainingModuleFormData.moduleUrl); // Ensure the field name is correct

      await axios.post(
        "http://localhost:5000/api/v1/training-modules",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Training module data submitted successfully!");
      setTrainingModuleFormData({
        trainingId: 0,
        moduleName: "",
        moduleType: "",
        moduleUrl: "",
      });
    } catch (err) {
      setTrainingModuleError("Failed to submit training module data");
      console.error(err);
    }
  };

  const formStyle = {
    width: "45%",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    margin: "10px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      {/* Training Form */}
      <div style={formStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Training Form
        </h2>
        <form onSubmit={handleTrainingSubmit}>
          <div>
            <label htmlFor="trainingType" style={labelStyle}>
              Training Type:
            </label>
            <input
              type="text"
              id="trainingType"
              name="trainingType"
              value={trainingFormData.trainingType}
              onChange={handleTrainingChange}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label htmlFor="trainingDate" style={labelStyle}>
              Training Date:
            </label>
            <input
              type="date"
              id="trainingDate"
              name="trainingDate"
              value={trainingFormData.trainingDate}
              onChange={handleTrainingChange}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label htmlFor="location" style={labelStyle}>
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={trainingFormData.location}
              onChange={handleTrainingChange}
              style={inputStyle}
              required
            />
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                buttonHoverStyle.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                buttonStyle.backgroundColor)
            }
          >
            Submit Training
          </button>
          {trainingError && <p style={{ color: "red" }}>{trainingError}</p>}
        </form>
      </div>

      {/* Employee Training Form */}
      <div style={formStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Employee Training Form
        </h2>
        <form onSubmit={handleEmployeeTrainingSubmit}>
          <div>
            <label htmlFor="employeeId" style={labelStyle}>
              Employee:
            </label>
            <select
              id="employeeId"
              name="employeeId"
              value={employeeTrainingFormData.employeeId}
              onChange={handleEmployeeTrainingChange}
              style={inputStyle}
              required
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.email}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="trainingId" style={labelStyle}>
              Training:
            </label>
            <select
              id="trainingId"
              name="trainingId"
              value={employeeTrainingFormData.trainingId}
              onChange={handleEmployeeTrainingChange}
              style={inputStyle}
              required
            >
              <option value="">Select Training</option>
              {trainings.map((training) => (
                <option key={training.id} value={training.id}>
                  {training.trainingType}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="scheduledDate" style={labelStyle}>
              Scheduled Date:
            </label>
            <input
              type="date"
              id="scheduledDate"
              name="scheduledDate"
              value={employeeTrainingFormData.scheduledDate}
              onChange={handleEmployeeTrainingChange}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label htmlFor="completionStatus" style={labelStyle}>
              Completion Status:
            </label>
            <select
              id="completionStatus"
              name="completionStatus"
              value={employeeTrainingFormData.completionStatus}
              onChange={handleEmployeeTrainingChange}
              style={inputStyle}
              required
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                buttonHoverStyle.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                buttonStyle.backgroundColor)
            }
          >
            Submit Employee Training
          </button>
          {employeeTrainingError && (
            <p style={{ color: "red" }}>{employeeTrainingError}</p>
          )}
        </form>
      </div>

      {/* Training Module Form */}
      <div style={formStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Training Module Form
        </h2>
        <form onSubmit={handleTrainingModuleSubmit}>
          <div>
            <label htmlFor="trainingId" style={labelStyle}>
              Training:
            </label>
            <select
              id="trainingId"
              name="trainingId"
              value={trainingModuleFormData.trainingId}
              onChange={handleTrainingModuleChange}
              style={inputStyle}
              required
            >
              <option value="">Select Training</option>
              {trainings.map((training) => (
                <option key={training.id} value={training.id}>
                  {training.trainingType}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="moduleName" style={labelStyle}>
              Module Name:
            </label>
            <input
              type="text"
              id="moduleName"
              name="moduleName"
              value={trainingModuleFormData.moduleName}
              onChange={handleTrainingModuleChange}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label htmlFor="moduleType" style={labelStyle}>
              Module Type:
            </label>
            <input
              type="text"
              id="moduleType"
              name="moduleType"
              value={trainingModuleFormData.moduleType}
              onChange={handleTrainingModuleChange}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label htmlFor="moduleUrl" style={labelStyle}>
              Module URL (or Upload File):
            </label>
            <input
              type="file"
              id="moduleUrl"
              name="moduleUrl"
              onChange={(e) => {
                if (e.target.files) {
                  setTrainingModuleFormData({
                    ...trainingModuleFormData,
                    moduleUrl: e.target.files[0].name,
                  });
                }
              }}
              style={inputStyle}
              required
            />
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                buttonHoverStyle.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                buttonStyle.backgroundColor)
            }
          >
            Submit Training Module
          </button>
          {trainingModuleError && (
            <p style={{ color: "red" }}>{trainingModuleError}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default About;
