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
import ThemeToggle from "../ThemeToggle/ThemeToggle";

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
            <ListItemText primary="DataTable" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/api">
            <ListItemText primary="API" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/form">
            <ListItemText primary="Zod & Form" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ThemeToggle />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h2"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: "1.5rem",
              fontWeight: 600,
            }}
          >
            DealAmaze Internship
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            <Button color="inherit" component={Link} to="/">
              DataTable
            </Button>
            <Button color="inherit" component={Link} to="/api">
              API
            </Button>
            <Button color="inherit" component={Link} to="/form">
              Zod & Form
            </Button>
            <ThemeToggle /> 
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "block", sm: "none" } }}
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
