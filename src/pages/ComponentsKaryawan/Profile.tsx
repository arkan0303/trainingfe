import React, { useEffect, useState } from "react";

// Definisikan tipe data sesuai dengan struktur data Anda
interface Training {
  id: number;
  trainingType: string;
  trainingDate: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

interface EmployeeTraining {
  id: number;
  training: Training;
}

interface Interview {
  id: number;
  employeeId: number;
  interviewDate: string;
  questions: string;
  answers: string;
  evaluationResult: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface EmployeeData {
  id: number;
  userId: number;
  email: string;
  plant: string;
  position: string;
  interviewStatus: string;
  createdAt: string;
  updatedAt: string;
  employeeTrainings: EmployeeTraining[];
  interviews: Interview[];
  notification: any[];
  user: User;
}

const Profile: React.FC = () => {
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const userId = localStorage.getItem("id"); // Pastikan key sesuai dengan yang disimpan
        if (!userId) {
          throw new Error("User ID tidak ditemukan di localStorage");
        }

        const response = await fetch(
          `http://localhost:5000/api/v1/employees-user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Gagal memuat data karyawan");
        }

        const data: EmployeeData = await response.json();
        setEmployeeData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  // Definisikan style seperti di PelatihanSaya
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      maxWidth: "800px",
      margin: "20px auto",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
      color: "#333",
    },
    section: {
      marginBottom: "30px",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#555",
      borderBottom: "2px solid #eee",
      paddingBottom: "5px",
    },
    list: {
      listStyleType: "none",
      padding: 0,
      margin: 0,
    },
    item: {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "10px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    info: {
      display: "flex",
      flexDirection: "column" as "column",
    },
    titleText: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#555",
      marginBottom: "5px",
    },
    dateText: {
      fontSize: "14px",
      color: "#7f8c8d",
      marginBottom: "5px",
    },
    status: {
      padding: "5px 10px",
      borderRadius: "5px",
      fontSize: "14px",
      fontWeight: "bold",
      color: "#ffffff",
    },
    statusSelesai: {
      backgroundColor: "#27ae60",
    },
    statusDalamProses: {
      backgroundColor: "#f39c12",
    },
    statusTidakLolos: {
      backgroundColor: "#e74c3c",
    },
  };

  if (loading) {
    return <div style={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.container}>Error: {error}</div>;
  }

  if (!employeeData) {
    return <div style={styles.container}>No data available</div>;
  }

  const { user, position, employeeTrainings, interviews } = employeeData;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Employee Details</h2>

      {/* Personal Information Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Personal Information</h3>
        <div style={styles.item}>
          <div style={styles.info}>
            <div style={styles.titleText}>{user.name}</div>
            <div style={styles.dateText}>Position: {position}</div>
          </div>
        </div>
      </div>

      {/* Training Information Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Training Information</h3>
        {employeeTrainings.length > 0 ? (
          <ul style={styles.list}>
            {employeeTrainings.map((et) => (
              <li key={et.id} style={styles.item}>
                <div style={styles.info}>
                  <div style={styles.titleText}>{et.training.trainingType}</div>
                  <div style={styles.dateText}>
                    Tanggal Pelatihan:{" "}
                    {new Date(et.training.trainingDate).toLocaleDateString()}
                  </div>
                  <div style={styles.dateText}>
                    Lokasi: {et.training.location}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Training Data Available</p>
        )}
      </div>

      {/* Interview Information Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Interview Information</h3>
        {interviews.length > 0 ? (
          <ul style={styles.list}>
            {interviews.map((interview) => {
              let statusStyle = styles.statusTidakLolos;
              if (
                interview.evaluationResult === "Selesai" ||
                interview.evaluationResult === "Lolos"
              ) {
                statusStyle = styles.statusSelesai;
              } else if (interview.evaluationResult === "Dalam Proses") {
                statusStyle = styles.statusDalamProses;
              }

              return (
                <li key={interview.id} style={styles.item}>
                  <div style={styles.info}>
                    <div style={styles.titleText}>
                      Tanggal Wawancara:{" "}
                      {new Date(interview.interviewDate).toLocaleDateString()}
                    </div>
                    <div style={styles.dateText}>
                      Hasil Evaluasi: {interview.evaluationResult}
                    </div>
                  </div>
                  <div
                    style={{
                      ...styles.status,
                      ...statusStyle,
                    }}
                  >
                    {interview.evaluationResult}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No Interview Data Available</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
