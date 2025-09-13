import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "./DataTableAPI/DataTable";
import WeatherCard from "./WeatherCard";
import { GridPaginationModel } from "@mui/x-data-grid";
import { RandomUser, RandomUserApiResponse } from "../../types";
import { columns } from "./columns";

// Fetch function
const fetchRandomUsers = async (): Promise<RandomUser[]> => {
  const res = await fetch("https://randomuser.me/api/?results=100");
  if (!res.ok) throw new Error("Failed to fetch users");

  const data: { results: RandomUserApiResponse[] } = await res.json();

  return data.results.map((user, index) => ({
    id: index + 1,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    phone: user.phone,
    office: user.location.city,
    age: user.dob.age,
    startDate: user.registered.date.split("T")[0],
  }));
};

const APIComponent: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(0);

  const { data, error, isLoading, isError } = useQuery<RandomUser[], Error>({
    queryKey: ["randomUsers"],
    queryFn: fetchRandomUsers,
  });

  const rows: RandomUser[] = data ?? [];

  const handlePageChange = (model: GridPaginationModel) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div style={{ color: "red" }}>{error?.message}</div>;

  return (
    <>
      <WeatherCard />
      <DataTable
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        page={page}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default APIComponent;
