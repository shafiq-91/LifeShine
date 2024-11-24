import React, { useState, useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Features = () => {
  const [topStudents, setTopStudents] = useState([]); // Top students data
  const [events, setEvents] = useState([]); // Events data
  const [blogs, setBlogs] = useState([]); // Blog data
  const [remainingTimes, setRemainingTimes] = useState({}); // Live countdown times
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch data from API for Top Students, Events, and Blog
    const fetchData = async () => {
      try {
        // Fetch Top Students data from API
        const topStudentsResponse = await fetch("http://localhost/api.php?action=read&table=top_students");
        const topStudentsData = await topStudentsResponse.json();
        setTopStudents(topStudentsData); // Set the fetched data for Top Students

        // Fetch Events data from new API endpoint
        const eventsResponse = await fetch("http://localhost/api.php?action=read&table=announcements");
        const eventsData = await eventsResponse.json();
        // Filter only events where type === 'events'
        const filteredEvents = eventsData.filter(event => event.type === 'events');
        setEvents(filteredEvents); // Set the filtered events data

        // Fetch Blogs data from API
        const blogsResponse = await fetch("http://localhost/api.php?action=read&table=blog");
        const blogsData = await blogsResponse.json();
        setBlogs(blogsData); // Set the fetched Blog data

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  // Helper function to calculate remaining time for an event
  const getTimeRemaining = (eventDate) => {
    const currentTime = new Date();
    const eventTime = new Date(eventDate);
    const remainingTime = eventTime - currentTime;

    if (remainingTime <= 0) return "Event started!";

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Update the countdown every second for each event
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTimes((prevTimes) => {
        const updatedTimes = { ...prevTimes };

        // Loop through each event and update its remaining time
        events.forEach((event) => {
          updatedTimes[event.id] = getTimeRemaining(event.date);
        });

        return updatedTimes;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [events]);

  return (
    <Box sx={{ padding: 4 }}>
      {/* Features Section (side by side layout) */}
      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
        {/* Top Students Section */}
        <Box sx={{ flex: 1, minWidth: "300px", padding: 3, borderRadius: 2, boxShadow: 3, transition: "all 0.3s ease", "&:hover": { transform: "scale(1.05)", boxShadow: 6 } }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>Top Students</Typography>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={100} />
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500 }}
              loop
              style={{ width: "100%", height: "100%" }}
            >
              {topStudents.map((student) => (
                <SwiperSlide key={student.id}>
                  <Box sx={{ textAlign: "center", padding: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                      <img
                        src={student.photo || "https://via.placeholder.com/150"} // If no photo is available, use a placeholder
                        alt={student.name}
                        style={{ width: "100px", height: "100px", borderRadius: "5%" }}
                      />
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>{student.name}</Typography>
                    <Typography variant="body2">{student.class}</Typography>
                    <Typography variant="body2">{`ID: ${student.id}`}</Typography>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Box>

        {/* Events Section */}
        <Box sx={{ flex: 1, minWidth: "300px", padding: 3, borderRadius: 2, boxShadow: 3, transition: "all 0.3s ease", "&:hover": { transform: "scale(1.05)", boxShadow: 6 } }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>Upcoming Events</Typography>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={200} />
          ) : (
            events.slice(0, 2).map((event) => (  // Only take the first 2 events
              <Box key={event.id} sx={{ marginBottom: 2, padding: 2, borderRadius: "8px", boxShadow: 1, transition: "all 0.3s ease", "&:hover": { transform: "scale(1.02)", boxShadow: 3 } }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{event.title}</Typography>
                <Typography variant="body1">{event.description}</Typography>
                <Typography variant="body2">Date: {event.date}</Typography>
                <Box sx={{ padding: 2, marginTop: 1, borderRadius: "8px" }}>
                  <Typography variant="body2">
                    Time Remaining: {remainingTimes[event.id] || "Loading..."}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>

        {/* Blog Section */}
        <Box sx={{ flex: 1, minWidth: "300px", padding: 3, borderRadius: 2, boxShadow: 3, transition: "all 0.3s ease", "&:hover": { transform: "scale(1.05)", boxShadow: 6 } }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>Latest Blogs</Typography>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={80} />
          ) : (
            blogs.slice(0, 2).map((blog) => (  // Only take the first 2 blogs
              <Box key={blog.id} sx={{ display: "flex", alignItems: "center", marginBottom: 2, padding: 2, borderRadius: "8px", boxShadow: 1, transition: "all 0.3s ease", "&:hover": { transform: "scale(1.02)", boxShadow: 3 } }}>
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  style={{ width: "80px", height: "80px", marginRight: "16px", borderRadius: "8px" }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>{blog.title}</Typography>
                  <Typography variant="body2">{blog.description}</Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Features;
