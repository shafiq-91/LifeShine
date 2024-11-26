import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Student from "./components/Student";
import Admission from "./components/Admission";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import NetError from "./components/NetError";
import NotFound from "./components/NotFound";
import StudentProfile from "./components/StudentProfile";
import axios from "axios";
import {
  Fab,
  Tooltip,
  Box,
  Typography,
  Slide,
  Paper,
  IconButton,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isApiError, setIsApiError] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  useEffect(() => {
    const preventRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", preventRightClick);

    return () => {
      document.removeEventListener("contextmenu", preventRightClick);
    };
  }, []);
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (!isOffline) {
      axios
        .get("http://localhost/api.php?action=read&table=school_assets")
        .then(() => setIsApiError(false))
        .catch(() => setIsApiError(true));
    }

    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    setTimeout(() => setIsLoading(false), 1500);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [isOffline]);

  if (isOffline) {
    return <NetError />;
  }

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loader"></div>
      </div>
    );
  }

  const toggleCall = () => {
    setIsCallOpen((prev) => !prev);
  };

  return (
    <Router>
      <>
        <Nav />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<Student />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/studentProfile/:id" element={<StudentProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />

        {/* Call Icon Section with Blur, Transparency, and Shadow */}
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Slide
            direction="left"
            in={isCallOpen}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 500, exit: 300 }}
          >
            <Paper
              elevation={5}
              sx={{
                p: 2,
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.6)", // Transparent white
                backdropFilter: "blur(10px)", // Blur effect
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)", // Soft shadow
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                minWidth: 250,
              }}
            >
              <IconButton
                onClick={toggleCall}

              >
                <CloseIcon />
              </IconButton>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  📞 Call Us
                </Typography>
                <Typography variant="body1" sx={{ mt: 0.5 }}>
                  +123-456-7890
                </Typography>
              </Box>
            </Paper>
          </Slide>

          <Tooltip title={isCallOpen ? "Close" : "Contact Us"}>
            <Fab
              color="primary"
              onClick={toggleCall}
              sx={{
                ml: isCallOpen ? 2 : 0,
                transition: "transform 0.3s ease",
                background: isCallOpen
                  ? "rgba(255, 99, 71, 0.8)" // Semi-transparent red
                  : "rgba(70, 130, 180, 0.8)", // Semi-transparent blue
                "&:hover": {
                  transform: "scale(1.15)",
                },
              }}
            >
              {isCallOpen ? <CloseIcon /> : <PhoneIcon />}
            </Fab>
          </Tooltip>
        </Box>
      </>
    </Router>
  );
}

export default App;
