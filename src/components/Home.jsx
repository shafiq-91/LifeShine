import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Skeleton } from "@mui/material";
import About from "./About";
import Features from "./Features";
import Testimonials from "./Testimonials";

const Home = () => {
  const [loadedImages, setLoadedImages] = useState({}); // Track loaded images
  const [slides, setSlides] = useState([]); // Dynamic slides from API
  const [loadingSlides, setLoadingSlides] = useState(true); // Track initial slide loading
  const [loadingError, setLoadingError] = useState(""); // To handle any loading error

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost/api.php?action=read&table=school_assets`
        );
        const data = await response.json();

        console.log("API Response:", data); // Log the API response for debugging

        // Find the entry where name === hero_content
        const heroContent = data.find((item) => item.name === "hero_content");

        if (heroContent) {
          const contentLinks = heroContent.content; // Use content directly

          console.log("Content Links:", contentLinks); // Log content links

          // Map to slide objects
          const slideData = contentLinks.map((link) => ({ image: link }));
          setSlides(slideData); // Update slides
        } else {
          setLoadingError("No hero_content found in API response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingError("Error fetching data from API.");
      } finally {
        setLoadingSlides(false); // Stop the loading state once data is fetched
      }
    };

    fetchData();
  }, []);

  // Handle image load event
  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true })); // Mark the image as loaded
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
          padding: "22px", // Add padding for small screens
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "95%", md: "80%" }, // Larger width for visual impact
            maxWidth: "1900px", // Maximum size for larger screens
            height: { xs: "35vh", sm: "40vh", md: "60vh" }, // Increased height
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)", // Stronger shadow for depth
            position: "relative",
          }}
        >
          {loadingSlides || loadingError ? (
            // Full-size skeleton while loading slides or error
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <Skeleton
                className="wave-skeleton"
                variant="rectangular"
                width="100%"
                height="100%"
              />
            </Box>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500 }}
              loop
              style={{ width: "100%", height: "100%" }}
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    {!loadedImages[index] ? (
                      // Skeleton for individual image loading
                      <Skeleton
                        className="wave-skeleton"
                        variant="rectangular"
                        width="100%"
                        height="100%"
                      />
                    ) : (
                      <Box
                        sx={{
                          backgroundImage: `url(${slide.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    )}
                    <img
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      style={{ display: "none" }} // Hide the actual img element
                      onLoad={() => handleImageLoad(index)} // Trigger when the image is fully loaded
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Box>
      </Box>
      <hr />
      <About />
      <Features />
      <Testimonials />
    </>
  );
};

export default Home;
