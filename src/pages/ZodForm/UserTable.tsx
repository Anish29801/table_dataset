import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/DataTable/DataTable";
import { UserFormData, PersonRow } from "../../types";

interface UserTableProps {
  users: UserFormData[];
}

const userColumns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "age", headerName: "Age", flex: 1 },
  { field: "gender", headerName: "Gender", flex: 1 },
  { field: "dob", headerName: "DOB", flex: 1 },
  { field: "branch", headerName: "Branch", flex: 1 },
  { field: "position", headerName: "Position", flex: 1 },
  { field: "office", headerName: "Office", flex: 1 },
  { field: "startDate", headerName: "Start Date", flex: 1 },
];

export function UserTable({ users }: UserTableProps) {
  const rows: PersonRow[] = users.map((user, index) => ({
    id: index + 1,
    name: user.name,
    age: user.age,
    gender: user.gender,
    dob: user.dob,
    branch: user.branch,
    position: "-",  
    office: "-",      
    startDate: "-",     
  }));

  return (
    <DataTable
      rows={rows}
      columns={userColumns}
      searchPlaceholder="Search by any user field"
    />
  );
}
