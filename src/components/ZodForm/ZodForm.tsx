import { useState } from 'react';
import { UserForm } from "./UserForm";
import { UserTable } from "./UserTable";
import { UserFormData } from "../../types";

const ZodForm = () => {
  const [users, setUsers] = useState<UserFormData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div>
      <UserForm setUsers={setUsers} />
      <UserTable users={users} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
};

export default ZodForm;
