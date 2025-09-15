import React, { useState } from "react";
import WeatherComponent from "../../components/WeatherComponent/WeatherComponent";
import DataTable from "../../components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { WeatherData } from "../../types";

interface WeatherRow {
  id: number;
  city: string;
  temp: number;
  feels_like: number;
  description: string;
  wind: number;
  humidity: number;
}

interface WeatherCardProps {
  onSuccess?: (data: WeatherRow) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ onSuccess }) => {
  const [rows, setRows] = useState<WeatherRow[]>([]);

  const columns: GridColDef[] = [
    { field: "city", headerName: "City", flex: 1 },
    { field: "temp", headerName: "Temperature (°C)", flex: 1 },
    { field: "feels_like", headerName: "Feels Like (°C)", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "wind", headerName: "Wind (m/s)", flex: 1 },
    { field: "humidity", headerName: "Humidity (%)", flex: 1 },
  ];

  const handleWeatherSuccess = (data: WeatherData) => {
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

    if (onSuccess) {
      onSuccess(newRow);
    }
  };

  return (
    <>
      <WeatherComponent onSuccess={handleWeatherSuccess} />
      <DataTable
        rows={rows}
        columns={columns}
        searchPlaceholder="Search city"
      />
    </>
  );
};

export default WeatherCard;
