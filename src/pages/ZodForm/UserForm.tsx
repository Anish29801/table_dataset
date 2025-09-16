import React from 'react';
import { Box, Button, TextField, MenuItem, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserFormData } from '../../types';
import "./ZodForm.module.css"

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
    <div className="user-form-container">
      <div className="user-form-card">
        <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ fontFamily: "Poppins, sans-serif" }}
      >
          User Input Form
      </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            console.log("Form Data:", JSON.stringify(data, null, 2));
            setUsers((prev) => [...prev, { ...data, age: Number(data.age) }]);
            reset();
          })}
        >
          <TextField
            label="Name"
            fullWidth
            className="user-form-field"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Age"
            type="number"
            fullWidth
            className="user-form-field"
            {...register("age", { valueAsNumber: true })}
            error={!!errors.age}
            helperText={errors.age?.message}
          />

          <TextField
            select
            label="Gender"
            fullWidth
            className="user-form-field"
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
            className="user-form-field"
            InputLabelProps={{ shrink: true }}
            {...register("dob")}
            error={!!errors.dob}
            helperText={errors.dob?.message}
          />

          <TextField
            label="Branch"
            fullWidth
            className="user-form-field"
            {...register("branch")}
            error={!!errors.branch}
            helperText={errors.branch?.message}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 4,
              py: 1.5,
              px: 4,
              minWidth: 140,
              bgcolor: "#1976d2",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: 2,
              alignSelf: "center",
              "&:hover": {
                bgcolor: "#155a9c",
                transform: "translateY(-2px)",
              },
            }}
          >
            Submit
          </Button>

        </Box>
      </div>
    </div>
  );
}
