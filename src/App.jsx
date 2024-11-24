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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isApiError, setIsApiError] = useState(false);

  useEffect(() => {
    if (!isOffline) {
      // Check API connectivity only if online
      axios
        .get("http://localhost/api.php?action=read&table=school_assets")
        .then(() => setIsApiError(false))
        .catch(() => setIsApiError(true));
    }

    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [isOffline]);

  // Show NetError component if offline or API error
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

  return (
    <Router>
      <>
        <Nav />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<Student />} />
            <Route path="/result" element={<Result />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NetError />} />
          </Routes>
        </div>
        <Footer />
      </>
    </Router>
  );
}

export default App;
