import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Grid,
  useTheme,
} from "@mui/material";
import { Lock, Person } from "@mui/icons-material";
import { guestLogin } from "../../redux/authSlice";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("🔐 Auth State:");
    console.log("Token:", authState.token);
    console.log("User:", authState.user);
    console.log("Is Authenticated:", authState.isAuthenticated);
    console.log("Is Guest:", authState.isGuest);
  }, [authState]);

  const handleGuestLogin = () => {
    dispatch(guestLogin());
    navigate("/dashboard");
  };

  const handleRegularLogin = () => {
    navigate("/auth");
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 4,
          background: theme.palette.background.paper,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 80,
                  height: 80,
                  mb: 2,
                }}
              >
                <Lock fontSize="large" />
              </Avatar>
              <Typography variant="h4" component="h1" gutterBottom>
                Welcome to Security Scanner
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Comprehensive vulnerability scanning with detailed reporting
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 4,
                borderLeft: { md: `1px solid ${theme.palette.divider}` },
                height: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Get Started
              </Typography>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<Person />}
                onClick={handleRegularLogin}
                sx={{ py: 1.5 }}
              >
                Login with Account
              </Button>
              <Typography variant="body2" color="text.secondary" align="center">
                OR
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={handleGuestLogin}
                sx={{ py: 1.5 }}
              >
                Continue as Guest
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LandingPage;
