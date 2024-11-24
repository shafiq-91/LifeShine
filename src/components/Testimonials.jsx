import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Typography, Avatar, Grid } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const Testimonials = () => {
  // Static testimonials data
  const testimonials = [
    {
      content: "This product has transformed how we work. It’s user-friendly and incredibly efficient. Highly recommend!",
      name: "John Doe",
      position: "CEO, Company A",
      avatar: "https://via.placeholder.com/150",
    },
    {
      content: "Exceptional customer service and a great experience overall. The quality speaks for itself.",
      name: "Jane Smith",
      position: "Marketing Manager, Company B",
      avatar: "https://via.placeholder.com/150",
    },
    {
      content: "We’ve seen huge improvements in productivity and team collaboration. This tool is a game changer.",
      name: "Alex Johnson",
      position: "Project Lead, Company C",
      avatar: "https://via.placeholder.com/150",
    },
    {
      content: "The support team is top-notch. It’s a product that really listens to its users and continues to improve.",
      name: "Sarah Williams",
      position: "Operations Head, Company D",
      avatar: "https://via.placeholder.com/150",
    },
  ];

  return (
    <Box sx={{ padding: "40px 20px"}}>
      <Typography variant="h4" align="center" sx={{ marginBottom: "30px", fontWeight: "bold" }}>
        What Our Clients Say
      </Typography>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        loop
        style={{ width: "100%", height: "100%" }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                padding: "40px 20px",
                textAlign: "center",
                // backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Avatar
                alt={testimonial.name}
                src={testimonial.avatar}
                sx={{
                  width: 60,
                  height: 60,
                  margin: "0 auto 20px",
                  border: `3px solid ${blueGrey[500]}`,
                }}
              />
              <Typography variant="body1" sx={{ fontStyle: "italic", color: blueGrey[700], marginBottom: "20px" }}>
                "{testimonial.content}"
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {testimonial.name}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: blueGrey[600] }}>
                {testimonial.position}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Testimonials;
