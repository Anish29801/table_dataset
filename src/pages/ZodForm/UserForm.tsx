import React from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserFormData } from "../../types";

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(1, "Age must be greater than 0"),
  gender: z
    .string()
    .min(1, "Gender is required")
    .refine((val) => ["Male", "Female", "Other"].includes(val), {
      message: "Gender must be Male, Female, or Other",
    }),
  dob: z.string().min(1, "Date of birth is required"),
  branch: z.string().min(1, "Branch is required"),
});

interface UserFormProps {
  setUsers: React.Dispatch<React.SetStateAction<UserFormData[]>>;
}

export function UserForm({ setUsers }: UserFormProps) {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      age: undefined,
      gender: "Male",
      dob: "",
      branch: "",
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        padding: 4,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit((data) => {
          const age = Number(data.age);
          setUsers((prev) => [...prev, { ...data, age }]);
          reset();
        })}
        sx={{
          width: "100%",
          maxWidth: 500,
          bgcolor: theme.palette.background.paper,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4" align="center" sx={{ fontWeight: 400 }}>
          User Input Form
        </Typography>

        <TextField
          label="Name"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Age"
          type="number"
          fullWidth
          {...register("age", { valueAsNumber: true })}
          error={!!errors.age}
          helperText={errors.age?.message}
          InputProps={{ inputProps: { min: 1 } }}
        />

        <TextField
          select
          label="Gender"
          fullWidth
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
          InputLabelProps={{ shrink: true }}
          {...register("dob")}
          error={!!errors.dob}
          helperText={errors.dob?.message}
        />

        <TextField
          label="Branch"
          fullWidth
          {...register("branch")}
          error={!!errors.branch}
          helperText={errors.branch?.message}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            py: 1.5,
            minWidth: 120,
            fontWeight: "bold",
            borderRadius: 2,
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
