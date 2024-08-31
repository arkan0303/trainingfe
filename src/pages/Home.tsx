import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import axios from "axios";

const Home: React.FC = () => {
  const [employeeCount, setEmployeeCount] = useState<number | null>(null);
  const [interviewCount, setInterviewCount] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/users-count")
      .then((response) => {
        setEmployeeCount(response.data.count);
      })
      .catch((error) => {
        console.error("There was an error fetching the employee count!", error);
      });

    axios
      .get("http://localhost:5000/api/v1/interviews-count")
      .then((response) => {
        setInterviewCount(response.data.count);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the recent interview count!",
          error
        );
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Jumlah Karyawan */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
            }}
          >
            <PeopleIcon fontSize="large" sx={{ color: "#4caf50", mr: 2 }} />
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Jumlah Semua Karyawan
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {employeeCount !== null ? employeeCount : "Loading..."}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Notifikasi yang Belum Dibaca */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
            }}
          >
            <NotificationsIcon
              fontSize="large"
              sx={{ color: "#f44336", mr: 2 }}
            />
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Notifikasi Belum Dibaca
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                8
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Wawancara Terkini */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
            }}
          >
            <WorkIcon fontSize="large" sx={{ color: "#2196f3", mr: 2 }} />
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Jumlah Terakhir Wawancara
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {interviewCount !== null ? interviewCount : "Loading..."}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Tugas yang Tertunda */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
            }}
          >
            <CalendarMonthIcon
              fontSize="large"
              sx={{ color: "#ff9800", mr: 2 }}
            />
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Tugas yang Tertunda
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                5
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Detail Jadwal Pelatihan */}
        <Grid item xs={12}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Detail Jadwal Pelatihan
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Pelatihan berikutnya akan diadakan pada tanggal 15 September 2024.
              Pastikan semua peserta sudah terdaftar.
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Total Pelatihan Terjadwal: 10
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Pelatihan Selesai: 5
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Pelatihan Dalam Proses: 3
            </Typography>
            <Typography variant="body1">Pelatihan Belum Dimulai: 2</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
