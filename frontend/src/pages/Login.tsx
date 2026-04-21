import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Link,
  Stack
} from "@mui/material";
import { Mail, Lock, Visibility, VisibilityOff, ArrowForward } from "@mui/icons-material";
import AuthLayout from "../components/auth/AuthLayout";
import AuthTabs from "../components/auth/AuthTabs";
import SocialButtons from "../components/auth/SocialButtons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../app/store";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const validate = () => {
    let tempErrors = { email: "", password: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      tempErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      dispatch(login(form));
    }
  };

  return (
    <AuthLayout>
      <Box sx={{ width: "100%" }}>
        <AuthTabs />

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ display: "block", mb: 1, mt: 3 }}>
            EMAIL ADDRESS
          </Typography>
          <TextField
            fullWidth
            name="email"
            placeholder="user@gmail.com"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail fontSize="small" sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                bgcolor: "#f4f7f9",
                "& fieldset": { border: "none" },
              },
            }}
          />

          <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ display: "block", mb: 1 }}>
            PASSWORD
          </Typography>
          <TextField
            fullWidth
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="........"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock fontSize="small" sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                bgcolor: "#f4f7f9",
                "& fieldset": { border: "none" },
              },
            }}
          />

          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={<Typography variant="body2" color="text.secondary">Remember Me</Typography>}
            />
            <Link href="#" underline="none" variant="body2" fontWeight="bold" sx={{ color: "#0052cc" }}>
              Forgot Password?
            </Link>
          </Stack>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            endIcon={!loading && <ArrowForward />}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: "uppercase",
              fontWeight: "bold",
              bgcolor: "#0052cc",
              boxShadow: "none",
              "&:hover": { bgcolor: "#0041a3", boxShadow: "none" }
            }}
          >
            {loading ? "Processing..." : "Sign In to Dashboard"}
          </Button>
        </Box>

        <Divider sx={{ my: 4 }}>
          <Typography variant="caption" color="text.secondary" fontWeight="bold">
            OR CONNECT WITH
          </Typography>
        </Divider>

        <SocialButtons />

        <Typography variant="caption" color="text.secondary" textAlign="center" sx={{ display: "block", mt: 4, px: 2 }}>
          By continuing, you agree to our <Link color="inherit" fontWeight="bold">Terms of Service</Link> and <Link color="inherit" fontWeight="bold">Privacy Policy</Link>.
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default Login;