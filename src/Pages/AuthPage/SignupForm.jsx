import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Password rules and checklist
const passwordRules = {
  min: (val) => val.length >= 8,
  uppercase: (val) => /[A-Z]/.test(val),
  lowercase: (val) => /[a-z]/.test(val),
  number: (val) => /\d/.test(val),
  special: (val) => /[@$!%*?&#]/.test(val),
};

const passwordChecklist = [
  { label: "At least 8 characters", check: passwordRules.min },
  { label: "At least one uppercase letter", check: passwordRules.uppercase },
  { label: "At least one lowercase letter", check: passwordRules.lowercase },
  { label: "At least one number", check: passwordRules.number },
  {
    label: "At least one special character (@$!%*?&#)",
    check: passwordRules.special,
  },
];

// Validation schema
const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  password: yup
    .string()
    .required("Password is required")
    .test(
      "strong-password",
      "Password does not meet strength requirements",
      (value) => passwordChecklist.every((rule) => rule.check(value || ""))
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  terms: yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

const SignupForm = () => {
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const onSubmit = (data) => {
    const { confirmPassword, ...userData } = data;
    console.log("Signup Data:", userData);
    // dispatch signup action here
  };

  const currentPassword = watch("password", "");

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Phone"
        {...register("phone")}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        {...register("password")}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Box sx={{ mt: 1, mb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Password must include:
        </Typography>
        <List dense sx={{ pl: 1 }}>
          {passwordChecklist.map(({ label, check }) => {
            const passed = check(currentPassword);
            return (
              <ListItem key={label} sx={{ py: 0 }}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  {passed ? (
                    <CheckCircleIcon color="success" fontSize="small" />
                  ) : (
                    <CancelIcon color="error" fontSize="small" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ variant: "body2" }}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>

      <TextField
        fullWidth
        margin="normal"
        label="Confirm Password"
        type="password"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />

      <FormControlLabel
        control={<Checkbox {...register("terms")} color="primary" />}
        label="I agree to the Terms and Conditions"
        sx={{ mt: 1 }}
      />
      {errors.terms && (
        <Typography color="error" variant="caption" sx={{ pl: 1 }}>
          {errors.terms.message}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3, py: 1.2 }}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignupForm;
