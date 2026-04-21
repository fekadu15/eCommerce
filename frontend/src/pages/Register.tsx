import { Box, Button, TextField, Typography, Alert, InputAdornment, IconButton, Divider } from "@mui/material";
import { Mail, Lock, Visibility, Person, ArrowForward } from "@mui/icons-material";
import AuthLayout from "../components/auth/AuthLayout";
import AuthTabs from "../components/auth/AuthTabs";
import SocialButtons from "../components/auth/SocialButtons";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../app/store";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => { if (user) navigate("/"); }, [user, navigate]);

  const validate = () => {
    let temp = { name: "", email: "", password: "" };
    if (!form.name.trim()) temp.name = "Full name required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) temp.email = "Valid email required";
    if (form.password.length < 8) temp.password = "Min 8 characters required";
    setErrors(temp);
    return Object.values(temp).every(x => x === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) dispatch(register(form));
  };

  return (
    <AuthLayout>
      <AuthTabs />
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box 
      component="form" onSubmit={handleSubmit} noValidate>
        <Typography 
        variant="caption" fontWeight="bold" color="text.secondary" sx={{ display: "block", mb: 0.5, mt: 2 }}>FULL NAME</Typography>
        <TextField
          fullWidth 
          name="name" 
          placeholder="your name"
          value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
          error={!!errors.name} helperText={errors.name}
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><Person fontSize="small"/></InputAdornment> } }}
          sx={{ mb: 2, "& .MuiOutlinedInput-root": { bgcolor: "#f4f7f9", "& fieldset": { border: "none" } } }}
        />

        <Typography 
        variant="caption" 
        fontWeight="bold" 
        color="text.secondary" 
        sx={{ display: "block", mb: 0.5 }}>EMAIL ADDRESS</Typography>
        <TextField
          fullWidth 
          name="email" 
          placeholder="user@gmail.com"
          value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
          error={!!errors.email} helperText={errors.email}
          slotProps={{ 
            input: { startAdornment: <InputAdornment position="start"><Mail fontSize="small"/></InputAdornment> } }}
          sx={{ mb: 2, "& .MuiOutlinedInput-root": { bgcolor: "#f4f7f9", "& fieldset": { border: "none" } } }}
        />

        <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>PASSWORD</Typography>
        <TextField
          fullWidth
           name="password" 
           type={showPassword ? 
            "text" : "password"
          }
             placeholder="••••••••"
          value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}
          error={!!errors.password} helperText={errors.password}
          slotProps={{ input: { 
            startAdornment: <InputAdornment position="start"><Lock fontSize="small"/></InputAdornment>,
            endAdornment: <IconButton onClick={() => setShowPassword(!showPassword)}><Visibility fontSize="small"/></IconButton>
          }}}
          sx={{ mb: 3, "& .MuiOutlinedInput-root": { bgcolor: "#f4f7f9", "& fieldset": { border: "none" } } }}
        />

        <Button fullWidth variant="contained" type="submit" disabled={loading} endIcon={<ArrowForward />} sx={{ py: 1.5, fontWeight: "bold", bgcolor: "#0052cc" }}>
          {loading ? "Creating Account..." : "Register Account"}
        </Button>
      </Box>
      <Divider sx={{ my: 3 }}><Typography variant="caption" color="text.secondary">OR REGISTER WITH</Typography></Divider>
      <SocialButtons />
    </AuthLayout>
  );
};

export default Register;