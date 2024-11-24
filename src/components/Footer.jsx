import React from "react";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        // backgroundColor: blueGrey[900],
        //
        padding: "60px 20px",
        marginTop: "60px",
        borderTop: `5px solid ${blueGrey[500]}`,
      }}
    >
      <Grid container spacing={6} justifyContent="space-between">
        {/* Logo and School Name */}
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/logo.png"
              alt="Life Shine School Logo"
              style={{
                width: 80,
                height: 80,
                marginRight: 20,
                borderRadius: "50%",
                border: `2px solid ${blueGrey[300]}`,
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Life Shine School
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              marginTop: "15px",
              // color: blueGrey[400],
              lineHeight: 1.8,
            }}
          >
            A place of excellence in education, where we shape the future and
            empower minds to achieve greatness.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Quick Links
          </Typography>
          <Box>
            <Link href="#" sx={{ display: "block", marginBottom: "10px" }}>
              Home
            </Link>
            <Link href="#" sx={{ display: "block", marginBottom: "10px" }}>
              About Us
            </Link>
            <Link href="#" sx={{ display: "block", marginBottom: "10px" }}>
              Courses
            </Link>
            <Link href="#" sx={{ display: "block", marginBottom: "10px" }}>
              Contact Us
            </Link>
          </Box>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Contact Information
          </Typography>
          <Box>
            <Typography variant="body2" sx={{ marginBottom: "10px" }}>
              Email: <Link href="mailto:info@lifeshineschoolbd.com" sx={{}}>info@lifeshineschoolbd.com</Link>
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: "10px" }}>
              Phone: <Link href="tel:+1234567890" sx={{}}>+1 234 567 890</Link>
            </Typography>
            <Typography variant="body2">
              Address: 123 Shine Avenue, City, Country
            </Typography>
          </Box>
        </Grid>

        {/* Social Media Links */}
        <Grid item xs={12} sm={2}>
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "150px" }}>
            <IconButton href="#" color="inherit" target="_blank" aria-label="Facebook">
              <Facebook sx={{
                '&:hover': {
                  color: '#106aff',
                }
              }} />
            </IconButton>
            <IconButton href="#" color="inherit" target="_blank" aria-label="Instagram">
              <Instagram sx={{
                '&:hover': {
                  color: '#E4405F', // Instagram's brand color
                }
              }} />

            </IconButton>
            <IconButton href="#" color="inherit" target="_blank" aria-label="Twitter">
              <Twitter sx={{
                '&:hover': {
                  color: '#1DA1F2', // Twitter's brand color
                }
              }} />

            </IconButton>
            <IconButton href="#" color="inherit" target="_blank" aria-label="LinkedIn">
              <LinkedIn sx={{
                '&:hover': {
                  color: '#0077B5', // LinkedIn's brand color
                }
              }} />

            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Bottom Section */}
      <Box sx={{ textAlign: "center", marginTop: "40px" }}>
        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
          © {new Date().getFullYear()} Life Shine School. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
