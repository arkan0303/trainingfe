import React, { useEffect, useState } from "react";

const PelatihanSaya: React.FC = () => {
  const [pelatihanData, setPelatihanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPelatihanData = async () => {
      try {
        // Ambil userId dari localStorage
        const userId = localStorage.getItem("id");
        if (!userId) {
          throw new Error("User ID tidak ditemukan di localStorage");
        }

        // Ambil data pelatihan dari API
        const response = await fetch(
          `http://localhost:5000/api/v1/employee-trainingss/${userId}`
        );
        if (!response.ok) {
          throw new Error("Gagal memuat data pelatihan");
        }

        const data = await response.json();
        setPelatihanData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPelatihanData();
  }, []);

  // Style untuk tampilan pelatihan
  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      maxWidth: "800px",
      margin: "20px auto",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
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
    titleText: {
      fontSize: "18px",
      fontWeight: "bold",
    },
    dateText: {
      fontSize: "14px",
      color: "#7f8c8d",
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
    statusBelumDimulai: {
      backgroundColor: "#e74c3c",
    },
  };

  if (loading) {
    return <div style={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.container}>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Jadwal Pelatihan Saya</h2>
      <ul style={styles.list}>
        {pelatihanData.map((pelatihan: any) => (
          <li key={pelatihan.id} style={styles.item}>
            <div>
              <div style={styles.titleText}>
                {pelatihan.training.trainingType}
              </div>
              <div style={styles.dateText}>
                Tanggal:{" "}
                {new Date(pelatihan.training.trainingDate).toLocaleDateString()}
              </div>
              <div style={styles.modulesList}>
                {pelatihan.training.trainingModules.map((module: any) => (
                  <div key={module.id} style={styles.moduleItem}>
                    {module.moduleName}
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                ...styles.status,
                ...(pelatihan.interviewStatus === "Selesai"
                  ? styles.statusSelesai
                  : pelatihan.interviewStatus === "Dalam Proses"
                  ? styles.statusDalamProses
                  : styles.statusBelumDimulai),
              }}
            >
              {pelatihan.completionStatus}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PelatihanSaya;
