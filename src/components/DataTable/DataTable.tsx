import React, { useState, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, TextField } from "@mui/material";

interface DataTableProps<T extends { id: number }> {
  rows: T[];
  columns: GridColDef[];
  searchPlaceholder?: string;
}

function DataTable<T extends { id: number }>({
  rows,
  columns,
  searchPlaceholder = "Search",
}: DataTableProps<T>) {
  const [searchText, setSearchText] = useState("");

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
      <TextField
        label={searchPlaceholder}
        placeholder={searchPlaceholder}
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

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
}

export default DataTable;
