import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, Paper, Alert, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../features/auth/authSlice";
import type { RootState, AppDispatch } from "../app/store";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (localError) setLocalError(null);
    if (error) dispatch(clearError());
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setLocalError("All fields are required");
      return false;
    }
    
    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const resultAction = await dispatch(register(formData));
    if (register.fulfilled.match(resultAction)) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>Register</Typography>
          
          {(error || localError) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {localError || error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Account created! Redirecting to login...
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <TextField 
              label="Name" 
              name="name" 
              fullWidth 
              margin="normal" 
              value={formData.name}
              onChange={handleChange}
              error={!!localError && !formData.name}
            />
            <TextField 
              label="Email" 
              name="email" 
              fullWidth 
              margin="normal" 
              value={formData.email}
              onChange={handleChange}
              error={!!localError && (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))}
            />
            <TextField 
              label="Password" 
              name="password" 
              type="password" 
              fullWidth 
              margin="normal" 
              value={formData.password}
              onChange={handleChange}
              error={!!localError && (formData.password.length < 6)}
            />
            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              sx={{ mt: 3 }} 
              disabled={loading || success}
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
          </form>
          
          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;