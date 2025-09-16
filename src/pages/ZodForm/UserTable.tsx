import { GridColDef } from "@mui/x-data-grid";
import { Box, Typography, useTheme } from "@mui/material";
import DataTable from "../../components/DataTable/DataTable";
import { UserFormData, SimpleUserRow } from "../../types";

interface UserTableProps {
  users: UserFormData[];
}

const userColumns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "age", headerName: "Age", flex: 1 },
  { field: "gender", headerName: "Gender", flex: 1 },
  { field: "dob", headerName: "DOB", flex: 1 },
  { field: "branch", headerName: "Branch", flex: 1 },
];

export function UserTable({ users }: UserTableProps) {
  const theme = useTheme();

  const rows: SimpleUserRow[] = users.map((user, index) => ({
    id: index + 1,
    name: user.name,
    age: user.age,
    gender: user.gender,
    dob: user.dob,
    branch: user.branch,
  }));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: 4,
        backgroundColor: theme.palette.background.default,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 400, marginBottom: 4 }}
      >
        User Data Table
      </Typography>

      <Box sx={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}>
        <DataTable
          rows={rows}
          columns={userColumns}
          searchPlaceholder="Search by name, age, etc."
        />
      </Box>
    </Box>
  );
}
