import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Stack, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile, clearError } from "../../features/auth/authSlice";
import type { RootState, AppDispatch } from "../../app/store";

const ProfileSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "" 
  });

 
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, name: user.name, email: user.email }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updateData: any = { name: formData.name, email: formData.email };
    if (formData.password) updateData.password = formData.password;

    dispatch(updateUserProfile(updateData));
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{ p: 3, bgcolor: "white", borderRadius: 3, border: "1px solid #f0f0f0" }}
    >
      <Typography variant="h6" fontWeight="900" mb={4}>Profile Settings</Typography>
      
      <Stack spacing={3}>
        <Box>
          <Typography variant="caption" fontWeight="900" color="text.secondary" sx={{ display: "block", mb: 1, textTransform: "uppercase" }}>
            Full Name
          </Typography>
          <TextField 
            fullWidth 
            name="name"
            variant="filled" 
            value={formData.name}
            onChange={handleChange}
            InputProps={{ disableUnderline: true, sx: { borderRadius: 2, bgcolor: "#f3f4f6" } }} 
          />
        </Box>

        <Box>
          <Typography variant="caption" fontWeight="900" color="text.secondary" sx={{ display: "block", mb: 1, textTransform: "uppercase" }}>
            Email Address
          </Typography>
          <TextField 
            fullWidth 
            name="email"
            variant="filled" 
            value={formData.email}
            onChange={handleChange}
            InputProps={{ disableUnderline: true, sx: { borderRadius: 2, bgcolor: "#f3f4f6" } }} 
          />
        </Box>

        <Box>
          <Typography variant="caption" fontWeight="900" color="text.secondary" sx={{ display: "block", mb: 1, textTransform: "uppercase" }}>
            Password 
          </Typography>
          <TextField 
            fullWidth 
            name="password"
            type="password" 
            variant="filled" 
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            InputProps={{ disableUnderline: true, sx: { borderRadius: 2, bgcolor: "#f3f4f6" } }} 
          />
        </Box>

        {error && (
          <Typography color="error" variant="caption" fontWeight="700">
            {error}
          </Typography>
        )}

        <Button 
          type="submit"
          variant="contained" 
          fullWidth 
          disabled={loading}
          sx={{ 
            bgcolor: "#0047ab", 
            py: 1.5, 
            fontWeight: "900", 
            borderRadius: 2, 
            "&:hover": { bgcolor: "#003580" } 
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "SAVE PROFILE CHANGES"}
        </Button>

       
        <Box mt={2}>
          <Typography variant="caption" fontWeight="900" color="text.secondary" sx={{ display: "block", mb: 1, textTransform: "uppercase" }}>
            Curator Preferences
          </Typography>
          <Stack>
            <FormControlLabel 
              control={<Checkbox defaultChecked size="small" />} 
              label={<Typography variant="caption" fontWeight="700">Newsletter curation</Typography>} 
            />
            <FormControlLabel 
              control={<Checkbox size="small" />} 
              label={<Typography variant="caption" fontWeight="700">Sms order updates</Typography>} 
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProfileSettings;