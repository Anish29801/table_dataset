import React, { useState, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import data from "../../data/data.json";
import { PersonRow } from "../../types";
import { Box, TextField } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200, sortable: true },
  { field: "position", headerName: "Position", width: 180 },
  { field: "office", headerName: "Office", width: 140 },
  { field: "age", headerName: "Age", type: "number", width: 100 },
  { field: "startDate", headerName: "Start Date", width: 140 },
];

const DataTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  // Map JSON data into PersonRow format
  const rows: PersonRow[] = (data as any[]).map((row, index) => ({
    id: index + 1,
    name: row["Name"],
    position: row["Position"],
    office: row["Office"],
    age: row["Age"],
    startDate: row["Start date"],
  }));

  // Filtered rows with memoization for performance
  const filteredRows = useMemo(() => {
    if (!searchText) return rows;
    return rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [rows, searchText]);

  return (
    <Box sx={{ height: 600, width: "100%", mt: 4 }}>
      {/* Search box */}
      <TextField
        label="Search"
         placeholder="Type to search"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* DataGrid */}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataTable;
