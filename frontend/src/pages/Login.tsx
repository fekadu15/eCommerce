import React, { useState, useEffect } from "react";
import { TextField,
   Button, 
   Typography,
    Container,
     Box, 
     Paper,
      Alert,
       CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import type { RootState, AppDispatch } from "../app/store";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [localError, setLocalError] = useState<string | null>(null);
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    return () => {
      dispatch(clearError());
    };
  }, [user, navigate, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (localError) setLocalError(null);
    if (error) dispatch(clearError());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

   
    if (!formData.email || !formData.password) {
      setLocalError("All fields are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setLocalError("Please enter a valid email address");
      return;
    }

    dispatch(login(formData));
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          {(error || localError) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {localError || error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email Address"
              name="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              error={!!localError && !formData.email}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              error={!!localError && !formData.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;