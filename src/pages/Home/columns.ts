import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200, sortable: true },
  { field: "position", headerName: "Position", width: 180 },
  { field: "office", headerName: "Office", width: 140 },
  { field: "age", headerName: "Age", type: "number", width: 100 },
  { field: "startDate", headerName: "Start Date", width: 140 },
];
