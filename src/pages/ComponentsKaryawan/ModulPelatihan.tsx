import React, { useEffect, useState } from "react";

interface TrainingModule {
  id: number;
  moduleName: string;
  moduleType: string;
  moduleUrl: string;
}

interface Training {
  id: number;
  trainingType: string;
  trainingDate: string;
  location: string;
  trainingModules: TrainingModule[];
}

interface Employee {
  id: number;
  userId: number;
  email: string;
  plant: string;
  position: string;
  interviewStatus: string;
}

interface EmployeeTraining {
  id: number;
  employeeId: number;
  trainingId: number;
  scheduledDate: string;
  completionStatus: string;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
  training: Training;
}

const ModulPelatihan: React.FC = () => {
  const [data, setData] = useState<EmployeeTraining[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("id");

      if (!userId) {
        setError("User ID is not available");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/employee-trainingss/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const baseURL = "http://localhost:5000";

  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#f1f5f9",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      maxWidth: "900px",
      margin: "20px auto",
      fontFamily: "'Roboto', sans-serif",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#333",
      marginBottom: "24px",
      textAlign: "center",
    },
    itemContainer: {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "15px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      borderLeft: "5px solid #007bff",
    },
    position: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#007bff",
      marginBottom: "8px",
    },
    trainingType: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#555",
      marginBottom: "12px",
    },
    moduleContainer: {
      marginTop: "15px",
    },
    moduleTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "10px",
    },
    video: {
      width: "100%",
      maxWidth: "600px",
      height: "300px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    downloadLink: {
      display: "inline-block",
      marginTop: "12px",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#ffffff",
      borderRadius: "6px",
      textDecoration: "none",
      fontWeight: "500",
    },
    error: {
      color: "#d9534f",
      textAlign: "center",
    },
    loading: {
      textAlign: "center",
      color: "#333",
    },
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Modul Pelatihan</h2>
      {data.map((entry) => (
        <div key={entry.id} style={styles.itemContainer}>
          <h3 style={styles.position}>{entry.employee.position}</h3>
          <p style={styles.trainingType}>
            <strong>Training Type:</strong> {entry.training.trainingType}
          </p>
          <div style={styles.trainingType}>
            Tanggal:{" "}
            {new Date(entry.training.trainingDate).toLocaleDateString()}
          </div>
          <div style={styles.moduleContainer}>
            {entry.training.trainingModules.map((module) =>
              module.moduleUrl &&
              module.moduleType.toLowerCase() === "vidio" ? (
                <div key={module.id}>
                  <h4 style={styles.moduleTitle}>{module.moduleName}</h4>
                  <video style={styles.video} controls>
                    <source
                      src={`${baseURL}${module.moduleUrl}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <a
                    href={`${baseURL}${module.moduleUrl}`}
                    download
                    style={styles.downloadLink}
                  >
                    Download Video
                  </a>
                </div>
              ) : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModulPelatihan;
