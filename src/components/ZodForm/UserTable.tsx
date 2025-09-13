import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { UserFormData } from '../../types';

interface UserTableProps {
  users: UserFormData[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function UserTable({ users, searchTerm, setSearchTerm }: UserTableProps) {
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <TextField
        label="Search by Name"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Branch</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.dob}</TableCell>
              <TableCell>{user.branch}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
