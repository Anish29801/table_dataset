import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#ffffff", boxShadow: "1.5rem" }}
      >
        <Toolbar>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
