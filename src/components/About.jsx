import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';

const About = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
                padding: '20px',
                // backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                minHeight: '100vh', // Ensure full viewport height
            }}
        >
            <Typography variant="h3" sx={{ marginBottom: 3, fontWeight: 'bold', animation: 'fadeIn 1s ease' }}>
                Welcome to Life Shine School
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    textAlign: 'center',
                    marginBottom: 3,
                    maxWidth: '800px',
                    animation: 'fadeIn 1.5s ease',
                }}
            >
                Life Shine School is committed to providing a balanced education, where students grow academically, socially, and emotionally. Our environment fosters a sense of belonging, creativity, and collaboration.
            </Typography>

            {/* Centered Grid Container */}
            <Grid
                container
                spacing={4}
                sx={{
                    justifyContent: 'center', // Center the grid items horizontally
                    alignItems: 'center', // Center the grid items vertically
                    animation: 'fadeIn 2s ease',
                }}
            >
                <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Card
                        sx={{
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                            borderRadius: '12px',
                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
                            background: 'rgba(255, 255, 255, 0.1)', // Transparent background
                            backdropFilter: 'blur(10px)', // Blur effect
                            WebkitBackdropFilter: 'blur(10px)', // For Safari support
                            '&:hover': {
                                transform: 'scale(1.05) rotateY(10deg)',
                                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                            },
                            width: '100%',
                            maxWidth: '500px'
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="200"
                            image="https://shokal.us/lifeshine/admin/home_source/16005003411723536038home.jpg" // Replace with actual image
                            alt="Academics"
                            sx={{
                                borderRadius: '12px 12px 0 0',
                                cursor: 'pointer',
                                transition: 'transform 0.5s ease',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                },
                            }}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                Academic Excellence
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                We prioritize high-quality education with a curriculum that encourages critical thinking, creativity, and innovation. Our students excel in their academic journey.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Card
                        sx={{
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                            borderRadius: '12px',
                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
                            background: 'rgba(255, 255, 255, 0.1)', // Transparent background
                            backdropFilter: 'blur(10px)', // Blur effect
                            WebkitBackdropFilter: 'blur(10px)', // For Safari support
                            '&:hover': {
                                transform: 'scale(1.05) rotateY(10deg)',
                                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                            },
                            width: '100%',
                            maxWidth: '500px',
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="200"
                            image="https://scontent.fcgp36-1.fna.fbcdn.net/v/t39.30808-6/428616568_889801599605276_4691815331087924093_n.jpg?stp=c198.0.1204.1204a_dst-jpg_s206x206_tt6&_nc_cat=104&ccb=1-7&_nc_sid=50ad20&_nc_eui2=AeHw1Kh1q25LezfWD6ovuGHz4sgy7KQoT4niyDLspChPiZoHy8EZ_KBOz74d2XX3xOOA_cT1pN-nzGzQSvr6wKJL&_nc_ohc=5-B05vTuI1oQ7kNvgEtGdcw&_nc_zt=23&_nc_ht=scontent.fcgp36-1.fna&_nc_gid=AEotxN8-0DTUKbNtq_oapEZ&oh=00_AYCo6fCXyg36SRU7uJNBkr1UtwROWxNc_A2G_DyMuNfEfQ&oe=6747965E" // Replace with actual image
                            alt="Extracurricular Activities"
                            sx={{
                                borderRadius: '12px 12px 0 0',
                                cursor: 'pointer',
                                transition: 'transform 0.5s ease',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                },
                            }}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                Extracurricular Activities
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Life Shine School offers a wide range of extracurricular activities that help students build leadership skills, teamwork, and personal development beyond the classroom.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <hr />
        </Box>
    );
};

export default About;
