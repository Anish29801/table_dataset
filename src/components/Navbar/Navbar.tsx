import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText
              primary="DataTable"
              primaryTypographyProps={{ sx: { color: "#1976d2" } }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/api">
            <ListItemText
              primary="API"
              primaryTypographyProps={{ sx: { color: "#1976d2" } }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/form">
            <ListItemText
              primary="Zod & Form"
              primaryTypographyProps={{ sx: { color: "#1976d2" } }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#ffffff", boxShadow: "1.5rem" }}
      >
        <Toolbar>
          {/* Left side title */}
          <Typography
            variant="h2"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#1976d2",
            }}
          >
            DealAmaze Internship
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ color: "#1976d2" }}
            >
              DataTable
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/api"
              sx={{ color: "#1976d2" }}
            >
              API
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/form"
              sx={{ color: "#1976d2" }}
            >
              Zod & Form
            </Button>
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "block", sm: "none" }, color: "#1976d2" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
