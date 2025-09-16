import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/DataTable/DataTable";
import { UserFormData, SimpleUserRow } from "../../types";
import "./ZodForm.module.css"

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
  const rows: SimpleUserRow[] = users.map((user, index) => ({
    id: index + 1,
    name: user.name,
    age: user.age,
    gender: user.gender,
    dob: user.dob,
    branch: user.branch,
  }));

  return (
   <div className="user-table-container">
      <div className="user-table-card">
        <h2 className="user-table-title">User Data Table</h2>
        <div className="table-container">
          <DataTable
            rows={rows}
            columns={userColumns}
            searchPlaceholder="Search by name, age, etc."
          />
        </div>
      </div>
    </div>
  );
}
