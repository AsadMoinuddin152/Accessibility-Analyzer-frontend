import React from "react";
import { useForm } from "react-hook-form";
import { Box, TextField, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    // dispatch login action here
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        margin="normal"
        fullWidth
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
