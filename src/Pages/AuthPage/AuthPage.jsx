import React, { useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </Typography>

        {isLogin ? <LoginForm /> : <SignupForm />}

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Typography>
          <Button onClick={() => setIsLogin(!isLogin)} size="small">
            {isLogin ? "Sign Up" : "Login"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthPage;
