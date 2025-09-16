import React, { useState, useEffect } from "react";
import "./WeatherCard.module.css"
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  TextField,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/DataTable/DataTable";
import { WeatherData } from "../../types";

const API_KEY = "d4153b342010ef4174468b6454bc0e26";

const fetchWeather = async (location: string): Promise<WeatherData> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather");
  return res.json();
};

import { WeatherRow } from "../../types";

const WeatherCard: React.FC = () => {
  const [location, setLocation] = useState("Hyderabad");
  const [rows, setRows] = useState<WeatherRow[]>([]);

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
      const newRow: WeatherRow = {
        id: rows.length + 1,
        city: data.name,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        description: data.weather[0].description,
        wind: data.wind.speed,
        humidity: data.main.humidity,
      };

      setRows((prev) => [...prev, newRow]);
    }
  }, [data, isError]);

  return (
    <Box className="weather-container">
      <Card className="weather-card">
        <Typography variant="h4" className="weather-title">
          Weather App
        </Typography>

        <Box className="input-section">
          <TextField
            fullWidth
            variant="outlined"
            size="medium"
            label="Enter City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => refetch()}
            sx={{
              minWidth: 140,
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
            Search
          </Button>

        </Box>

        {isLoading ? (
          <Box className="loading-container">
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Typography className="error-message">
            ❌ Failed to load weather data.
          </Typography>
        ) : null}

        <Box className="table-container">
          <DataTable
            rows={rows}
            columns={columns}
            searchPlaceholder="Search city"
          />
        </Box>
      </Card>
    </Box>


  );
};

export default WeatherCard;
