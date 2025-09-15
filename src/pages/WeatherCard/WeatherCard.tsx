import React, { useState, useEffect } from "react";
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

interface WeatherRow {
  id: number;
  city: string;
  temp: number;
  feels_like: number;
  description: string;
  wind: number;
  humidity: number;
}

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
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ width: "90%", maxWidth: 800, p: 3, boxShadow: 6, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
          Weather App
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
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
            sx={{ minWidth: "120px" }}
          >
            Search
          </Button>
        </Box>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Typography color="error" textAlign="center">
            ❌ Failed to load weather data.
          </Typography>
        ) : null}

        <Box sx={{ height: 450, mt: 4 }}>
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
