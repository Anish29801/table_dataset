import React, { useState, useMemo } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface DataTableProps<T extends { id: number }> {
  rows: T[];
  columns: GridColDef[];
  searchPlaceholder?: string;
}

function DataTable<T extends { id: number }>(props: DataTableProps<T>) {
  const { rows, columns, searchPlaceholder = "Search" } = props;
  const [searchText, setSearchText] = useState("");
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredRows = useMemo(() => {
    if (!searchText) return rows;
    return rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [rows, searchText]);

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row as T);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRow(null);
  };

  // Helper function to convert key to Sentence Case
  const toSentenceCase = (str: string) => {
    const result = str
      // Add space before capital letters
      .replace(/([A-Z])/g, " $1")
      // Replace underscores with spaces
      .replace(/_/g, " ")
      .trim();
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

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
        onRowClick={handleRowClick}
      />

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Row Details</DialogTitle>
        <DialogContent dividers>
          {selectedRow &&
            Object.entries(selectedRow).map(([key, value]) => (
              <Typography key={key} sx={{ mb: 1 }}>
                <strong>{toSentenceCase(key)}:</strong> {String(value)}
              </Typography>
            ))}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            sx={{
              bgcolor: "red",
              "&:hover": {
                bgcolor: "darkred",
              },
            }}
          >
            Close
          </Button>

        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DataTable;
