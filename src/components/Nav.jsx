import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import CloseIcon from "@mui/icons-material/Close";

const Nav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [theme, setTheme] = useState("light");  // Only light theme now
  const [admissionOpen, setAdmissionOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#f4f9ff", // Set a light background color
      },
      text: {
        primary: "#000000", // Set text color to black for light mode
      },
    },
  });

  const themeConfig = lightTheme;

  const drawerLinks = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Student", icon: <SchoolIcon />, path: "/student" },
    {
      text: "Admission",
      icon: <PlaylistAddIcon />,
      path: "/admission",
      submenu: [
        { text: "Online Admission", path: "/admission/online" },
        { text: "Offline Admission", path: "/admission/offline" },
      ],
    },
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  ];

  return (
    <ThemeProvider theme={themeConfig}>
      <AppBar position="sticky" sx={{ backgroundColor: themeConfig.palette.background.default }}>
        <Toolbar className="flex justify-between">
          <Box className="flex items-center gap-3">
            <IconButton
              edge="start"
              onClick={toggleDrawer}
              aria-label="menu"
              sx={{ color: themeConfig.palette.text.primary, fontSize: "2.5rem" }}
            >
              <MenuIcon />
            </IconButton>

            {/* Wrap the logo in a Link to redirect to '/' */}
            <Link to="/">
              <Box
                component="img"
                src="/logo.png"
                alt="Logo"
                sx={{
                  height: "40px",
                  objectFit: "contain",
                }}
              />
            </Link>
          </Box>

          <Box className="hidden md:flex gap-8">
            {drawerLinks.map((link) => (
              <Button
                key={link.text}
                startIcon={link.icon}
                sx={{
                  color: themeConfig.palette.text.primary,
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  textTransform: "capitalize",
                  borderRadius: "25px",
                  padding: "8px 16px",
                  transition: "background 0.3s ease, transform 0.2s",
                  "&:hover": {
                    backgroundColor: themeConfig.palette.background.paper,
                    transform: "translateY(-2px)",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  },
                }}
                component={Link} // Add Link here
                to={link.path} // Define the path for the link
              >
                {link.text}
              </Button>
            ))}
          </Box>

          <Box className="flex items-center gap-4">
            <Tooltip title="Light Mode">
              <IconButton
                onClick={() => handleThemeChange("light")}
                sx={{
                  color: themeConfig.palette.text.primary,
                  "&:hover": { bgcolor: themeConfig.palette.background.paper, transform: "scale(1.1)" },
                  transition: "transform 0.2s ease",
                }}
              >
                <Brightness4Icon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: themeConfig.palette.background.default,
            color: themeConfig.palette.text.primary,
            width: "270px",
            padding: "2rem 1.5rem",
            boxShadow: themeConfig.palette.mode === "dark" ? "4px 4px 12px rgba(255, 255, 255, 0.2)" : "4px 4px 12px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s, box-shadow 0.3s ease-in-out",
          },
        }}
      >
        <Box className="flex justify-between items-center pb-4">
          <IconButton
            onClick={toggleDrawer}
            sx={{
              color: themeConfig.palette.text.primary,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Link to="/">
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{
                height: "35px",
                objectFit: "contain",
              }}
            />
          </Link>
        </Box>

        <Divider sx={{ borderColor: themeConfig.palette.text.primary }} />

        <List>
          {drawerLinks.map((link) => (
            <React.Fragment key={link.text}>
              <ListItem
                button
                onClick={() => {
                  if (link.submenu) {
                    setAdmissionOpen(!admissionOpen); // Open/close dropdown for submenu links
                  } else {
                    toggleDrawer(); // Close sidebar for non-submenu links
                  }
                }}
                component={Link}
                to={link.path}
              >
                <ListItemIcon sx={{ color: themeConfig.palette.text.primary }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.text}
                  sx={{
                    color: themeConfig.palette.text.primary,
                  }}
                />
              </ListItem>
              {link.submenu && admissionOpen && (
                <Box sx={{ paddingLeft: "2rem" }}>
                  {link.submenu.map((submenuItem) => (
                    <ListItem
                      key={submenuItem.text}
                      button
                      component={Link}
                      to={submenuItem.path}
                      sx={{
                        color: themeConfig.palette.text.primary,
                      }}
                    >
                      <ListItemText
                        primary={submenuItem.text}
                        sx={{
                          color: themeConfig.palette.text.primary,
                        }}
                      />
                    </ListItem>
                  ))}
                </Box>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default Nav;
