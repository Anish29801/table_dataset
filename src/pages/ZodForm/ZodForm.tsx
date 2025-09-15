import { useState } from "react";
import { UserForm } from "./UserForm";
import { UserTable } from "./UserTable";
import { UserFormData } from "../../types";

const ZodForm = () => {
  const [users, setUsers] = useState<UserFormData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.age.toString().includes(searchTerm) ||
    user.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.dob.includes(searchTerm) ||
    user.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <UserForm setUsers={setUsers} />
      <UserTable users={filteredUsers} />
    </div>
  );
};

export default ZodForm;
