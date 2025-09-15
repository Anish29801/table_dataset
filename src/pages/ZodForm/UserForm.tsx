import React from 'react';
import { Box, Button, TextField, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserFormData } from '../../types';

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z
    .number()
    .min(1, "Age must be greater than 0")
    .refine(val => !isNaN(val), { message: "Age must be a number" }),
  gender: z.string()
    .min(1, "Gender is required")
    .refine(val => ["Male", "Female", "Other"].includes(val), {
      message: "Gender must be Male, Female, or Other",
    }),
  dob: z.string().min(1, "Date of birth is required"),
  branch: z.string().min(1, "Branch is required"),
});

interface UserFormProps {
  setUsers: React.Dispatch<React.SetStateAction<UserFormData[]>>;
}

export function UserForm({ setUsers }: UserFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      age: 0,
      gender: "Male",
      dob: "",
      branch: "",
    },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => {
        console.log("Form Data:", JSON.stringify(data, null, 2));
        setUsers(prev => [...prev, { ...data, age: Number(data.age) }]);
        reset();
      })}
      sx={{ mb: 4 }}
    >
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        label="Age"
        type="number"
        fullWidth
        margin="normal"
        {...register("age", { valueAsNumber: true })}
        error={!!errors.age}
        helperText={errors.age?.message}
      />

      <TextField
        select
        label="Gender"
        fullWidth
        margin="normal"
        defaultValue="Male"
        {...register("gender")}
        error={!!errors.gender}
        helperText={errors.gender?.message}
      >
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>

      <TextField
        label="Date of Birth"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        {...register("dob")}
        error={!!errors.dob}
        helperText={errors.dob?.message}
      />

      <TextField
        label="Branch"
        fullWidth
        margin="normal"
        {...register("branch")}
        error={!!errors.branch}
        helperText={errors.branch?.message}
      />

      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
