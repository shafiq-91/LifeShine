import React, { useState, useEffect, useRef } from "react";
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
  Menu,
  MenuItem,
  Typography,
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
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CloseIcon from "@mui/icons-material/Close";

const Nav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [theme, setTheme] = useState("system");
  const [anchorEl, setAnchorEl] = useState(null);
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const openMenu = Boolean(anchorEl);
  const admissionButtonRef = useRef(null);

  const handleSubmenuClick = () => {
    setAdmissionOpen(false); // Close the dropdown
  };


  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    if (theme === "system") {
      setTheme(systemTheme);
    }
  }, [theme]);

  useEffect(() => {
    if (theme === "light") {
      document.body.style.backgroundColor = "#f4f9ff";
      document.body.style.color = "#000000"; // Set body text color to black in light mode
    } else if (theme === "dark") {
      document.body.style.backgroundColor = "#1A202C";
      document.body.style.color = "#f1f1f1"; // Ensure text color is white in dark mode
    }
  }, [theme]);

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

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#1A202C", // Dark background color
      },
      text: {
        primary: "#f1f1f1", // Light text color for dark mode
      },
    },
  });


  const themeConfig = theme === "dark" ? darkTheme : lightTheme;

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setAnchorEl(null);
  };

  const handleAdmissionClick = () => {
    setAdmissionOpen(!admissionOpen);
  };

  const drawerLinks = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Student", icon: <SchoolIcon />, path: "/student" },
    { text: "Result", icon: <AssessmentIcon />, path: "/result" },
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
                onClick={link.text === "Admission" ? handleAdmissionClick : null}
                ref={link.text === "Admission" ? admissionButtonRef : null}
                component={Link} // Add Link here
                to={link.path} // Define the path for the link
              >
                {link.text}
              </Button>
            ))}
          </Box>

          {admissionOpen && (
            <Box
              sx={{
                position: "absolute",
                top: `${admissionButtonRef.current?.offsetTop + 40}px`,
                left: `${admissionButtonRef.current?.offsetLeft}px`,
                backgroundColor: themeConfig.palette.background.paper,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                padding: "10px",
                borderRadius: "5px",
                zIndex: 1000,
                minWidth: "160px",
              }}
            >
              <Button
                sx={{ display: "block", color: themeConfig.palette.text.primary }}
                component={Link}
                to="/admission/online"
                onClick={handleSubmenuClick} // Close dropdown
              >
                Online Admission
              </Button>
              <Button
                sx={{ display: "block", color: themeConfig.palette.text.primary }}
                component={Link}
                to="/admission/offline"
                onClick={handleSubmenuClick} // Close dropdown
              >
                Offline Admission
              </Button>
            </Box>
          )}


          <Box className="flex items-center gap-4">
            <Tooltip title="Select Theme">
              <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  color: themeConfig.palette.text.primary,
                  "&:hover": { bgcolor: themeConfig.palette.background.paper, transform: "scale(1.1)" },
                  transition: "transform 0.2s ease",
                }}
              >
                {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleThemeChange("light")}>Light Mode</MenuItem>
              <MenuItem onClick={() => handleThemeChange("dark")}>Dark Mode</MenuItem>
              <MenuItem onClick={() => handleThemeChange("system")}>System Default</MenuItem>
            </Menu>
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
                    handleAdmissionClick(); // Open/close dropdown for submenu links
                  } else {
                    toggleDrawer(); // Close sidebar for non-submenu links
                  }
                }}
                component={Link} // Wrap each ListItem with Link
                to={link.path} // Use `to` prop for navigation
              >
                <ListItemIcon sx={{ color: themeConfig.palette.text.primary }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.text}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: themeConfig.palette.text.primary,
                  }}
                />
              </ListItem>
              {link.submenu && admissionOpen && (
                <List>
                  {link.submenu.map((submenuLink) => (
                    <ListItem
                      key={submenuLink.text}
                      button
                      component={Link} // Enable navigation for submenu items
                      to={submenuLink.path}
                      onClick={toggleDrawer} // Close sidebar when submenu is clicked
                      sx={{ paddingLeft: "2rem" }}
                    >
                      <ListItemText
                        primary={submenuLink.text}
                        primaryTypographyProps={{
                          fontWeight: 500,
                          fontSize: "0.95rem",
                          color: themeConfig.palette.text.primary,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default Nav;