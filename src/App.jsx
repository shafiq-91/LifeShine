import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Student from "./components/Student";
import Result from "./components/Result";
import Admission from "./components/Admission";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import NetError from "./components/NetError";
import axios from "axios";

// Import Material UI icons
import CallIcon from '@mui/icons-material/Call';
import CloseIcon from '@mui/icons-material/Close';
import NotFound from "./components/NotFound";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isApiError, setIsApiError] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine); // Initial offline check

  useEffect(() => {
    // Cache offline status in localStorage
    localStorage.setItem("offlineStatus", isOffline ? "true" : "false");

    if (!isOffline) {
      // If online, check API connection
      axios
        .get("http://localhost/api.php?action=read&table=school_assets")
        .then(() => setIsApiError(false))
        .catch(() => setIsApiError(true));
    }

    // Handle network status changes
    const handleOffline = () => {
      setIsOffline(true);
      localStorage.setItem("offlineStatus", "true");
    };

    const handleOnline = () => {
      setIsOffline(false);
      localStorage.setItem("offlineStatus", "false");
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [isOffline]);

  const toggleExpansion = () => setIsExpanded((prev) => !prev);

  // Show NetError if offline or API error
  if (isOffline || isApiError) {
    return <NetError />;
  }

  return (
    <Router>
      {isLoading ? (
        <div className="loading-overlay">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <Nav />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/student" element={<Student />} />
              <Route path="/result" element={<Result />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          {/* Call Icon */}
          <div
            onClick={toggleExpansion}
            className="fixed bottom-5 right-5 bg-blue-600 p-4 rounded-full shadow-lg cursor-pointer transition-all duration-500 ease-in-out"
            style={{
              right: isExpanded ? "320px" : "20px",
            }}
          >
            <CallIcon className="text-white text-3xl" />
          </div>

          {isExpanded && (
            <div
              className="fixed bottom-5 right-10 bg-white p-4 rounded-lg shadow-xl w-[270px] transition-all duration-500 ease-in-out"
              style={{
                opacity: 1,
                zIndex: 999,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                border: "2px solid #007BFF",
                backgroundColor: "#f0f8ff",
              }}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-gray-700">Contact Number:</h4>
                <CloseIcon
                  onClick={toggleExpansion}
                  className="cursor-pointer text-blue-600 text-xl hover:text-blue-800 transition-colors"
                />
              </div>
              <p className="mt-2 text-gray-700 font-medium">123-456-7890</p>
            </div>
          )}
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;
