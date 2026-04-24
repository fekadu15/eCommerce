import { 
  Box, Typography, Stack, Paper, Button, Chip, 
  Grid, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Checkbox, FormControlLabel 
} from "@mui/material";
import { LocationOnOutlined, Add } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAddress, deleteAddress, editAddress } from "../../features/auth/authSlice"; 
import type { RootState, AppDispatch } from "../../app/store";

const AddressBook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const addresses = user?.addresses || [];

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null); 
  const [formData, setFormData] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: false,
  });

  const handleOpen = (address?: any) => {
    if (address) {
      setEditId(address._id);
      setFormData({
        label: address.label,
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
        isDefault: address.isDefault,
      });
    } else {
      setEditId(null);
      setFormData({ label: "", street: "", city: "", state: "", zipCode: "", country: "", isDefault: false });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.label || !formData.street || !formData.city) return;

    if (editId) {
      await dispatch(editAddress({ id: editId, addressData: formData }));
    } else {
      await dispatch(addAddress(formData));
    }
    
    handleClose();
  };

  const handleRemove = (id: string) => {
    if (window.confirm("Remove this address?")) {
      dispatch(deleteAddress(id));
    }
  };

  return (
    <Box mt={6}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Stack direction="row" spacing={1} alignItems="center">
          <LocationOnOutlined sx={{ color: "#0047ab" }} />
          <Typography variant="h6" fontWeight="900">Shipping Addresses</Typography>
        </Stack>
        <Button 
          onClick={() => handleOpen()} 
          startIcon={<Add />} 
          size="small" 
          sx={{ bgcolor: "#f3f4f6", color: "#0047ab", fontWeight: 900, borderRadius: 2, px: 2, "&:hover": { bgcolor: "#e5e7eb" } }}
        >
          Add New
        </Button>
      </Stack>

      <Grid container spacing={2} >
        {addresses.map((addr) => (
          <Grid size={{ xs: 12, sm: 6 }} key={addr._id}>
            <Paper 
  elevation={0} 
  sx={{ 
    p: 3, 
    borderRadius: 3, 
    bgcolor: "#f3f4f6", 
    border: "1px solid #f0f0f0", 
    height: "100%", 
    display: "flex", 
    flexDirection: "column",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)" 
  }}
>
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle2" fontWeight="900">{addr.label}</Typography>
                {addr.isDefault && <Chip label="DEFAULT" size="small" sx={{ fontSize: "0.6rem", fontWeight: 900, bgcolor: "#2b63f1", color: "white", height: 20 }} />}
              </Stack>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
                {addr.street}<br />{addr.city}, {addr.state}, {addr.zipCode}<br />{addr.country}
              </Typography>
              <Stack direction="row" spacing={2} mt="auto">
                <Typography 
                  onClick={() => handleOpen(addr)} 
                  variant="caption" 
                  fontWeight="900" 
                  sx={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  EDIT
                </Typography>
                <Typography onClick={() => handleRemove(addr._id)} variant="caption" fontWeight="900" sx={{ cursor: "pointer", textDecoration: "underline", color: "#d32f2f" }}>
                  {loading ? "..." : "REMOVE"}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 900 }}>
          {editId ? "Edit Address" : "Add New Address"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField fullWidth label="Label (Home/Office)" name="label" value={formData.label} onChange={handleChange} variant="filled" InputProps={{ disableUnderline: true, sx: { borderRadius: 2 } }} />
            <TextField fullWidth label="Street Address" name="street" value={formData.street} onChange={handleChange} variant="filled" InputProps={{ disableUnderline: true, sx: { borderRadius: 2 } }} />
            <Stack direction="row" spacing={2}>
              <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} variant="filled" InputProps={{ disableUnderline: true, sx: { borderRadius: 2 } }} />
              <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} variant="filled" InputProps={{ disableUnderline: true, sx: { borderRadius: 2 } }} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField fullWidth label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} variant="filled" InputProps={{ disableUnderline: true, sx: { borderRadius: 2 } }} />
              <TextField fullWidth label="Country" name="country" value={formData.country} onChange={handleChange} variant="filled" InputProps={{ disableUnderline: true, sx: { borderRadius: 2 } }} />
            </Stack>
            <FormControlLabel 
              control={<Checkbox name="isDefault" checked={formData.isDefault} onChange={handleChange} />} 
              label={<Typography variant="body2">Set as default address</Typography>} 
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} sx={{ color: "text.secondary", fontWeight: 700 }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading} sx={{ bgcolor: "#0047ab", borderRadius: 2, px: 4, fontWeight: 900 }}>
            {loading ? "Saving..." : editId ? "Update Address" : "Save Address"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddressBook;