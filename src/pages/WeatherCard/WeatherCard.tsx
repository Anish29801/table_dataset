import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  CircularProgress,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/DataTable/DataTable";
import { WeatherData, WeatherRow } from "../../types";

const API_KEY = "d4153b342010ef4174468b6454bc0e26";

const fetchWeather = async (location: string): Promise<WeatherData> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather");
  return res.json();
};

const WeatherCard: React.FC = () => {
  const [location, setLocation] = useState("");
  const [rows, setRows] = useState<WeatherRow[]>([]);
  const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: "city", headerName: "City", flex: 1 },
    { field: "temp", headerName: "Temperature (°C)", flex: 1 },
    { field: "feels_like", headerName: "Feels Like (°C)", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "wind", headerName: "Wind (m/s)", flex: 1 },
    { field: "humidity", headerName: "Humidity (%)", flex: 1 },
  ];

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["weather", location],
    queryFn: () => fetchWeather(location),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && !isError) {
      const cityExists = rows.some(
        (row) => row.city.toLowerCase() === data.name.toLowerCase()
      );

      if (cityExists) {
        setIsDuplicateDialogOpen(true);
      } else {
        const newRow: WeatherRow = {
          id: rows.length + 1,
          city: data.name,
          temp: `${data.main.temp} °C`,
          feels_like: `${data.main.feels_like} °C`,
          description: data.weather[0].description,
          wind: `${data.wind.speed} m/s`,
          humidity: `${data.main.humidity} %`,
        };

        setRows((prev) => [...prev, newRow]);
      }

      setLocation("");
    }
  }, [data, isError]);

  const handleCloseDuplicateDialog = () => {
    setIsDuplicateDialogOpen(false);
  };

  const handleGoClick = () => {
    if (location.trim() === "") return;
    refetch();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: 4,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 400,
          textAlign: "center",
          marginBottom: 4,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Weather App
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: 4,
        }}
      >
        <TextField
          variant="outlined"
          size="medium"
          label="Enter City"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ minWidth: 300, flexGrow: 1 }}
        />

        <Button
          variant="contained"
          onClick={handleGoClick}
          sx={{
            minWidth: 120,
            height: 56,
            bgcolor: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#155a9c",
              transform: "translateY(-2px)",
            },
          }}
        >
          Go
        </Button>
      </Box>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem 0",
          }}
        >
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography
          sx={{
            color: "red",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          ❌ Failed to load weather data.
        </Typography>
      ) : null}

      <Box sx={{ marginTop: 4 }}>
        <DataTable rows={rows} columns={columns} GoPlaceholder="Go city" />
      </Box>

      <Dialog open={isDuplicateDialogOpen} onClose={handleCloseDuplicateDialog}>
        <DialogTitle>Duplicate City</DialogTitle>
        <DialogContent>
          This city is already added in the Data Table.
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCloseDuplicateDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WeatherCard;
