import React, { useState, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, TextField } from "@mui/material";
import { PersonRow } from "../../types";

interface DataTableProps {
  rows: PersonRow[];
  columns: GridColDef[];
  searchPlaceholder?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  rows,
  columns,
  searchPlaceholder = "Type to search",
}) => {
  const [searchText, setSearchText] = useState("");

  const filteredRows = useMemo(() => {
    if (!searchText) return rows;
    return rows.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [rows, searchText]);

  return (
    <Box sx={{ height: 600, width: "100%", mt: 4 }}>
      <TextField
        label="Search"
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
};

export default DataTable;
