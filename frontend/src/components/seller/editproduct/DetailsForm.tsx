import { Paper, Typography, TextField, Grid2 as Grid, InputAdornment, MenuItem } from "@mui/material";

const DetailsForm = ({ data, onChange }: any) => (
  <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid #eee" }}>
    <Typography variant="h6" fontWeight="900" sx={{ mb: 3 }}>Architectural Identity</Typography>
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="caption" fontWeight="800" color="text.secondary">PRODUCT NAME</Typography>
        <TextField 
          fullWidth variant="filled" hiddenLabel 
          value={data.name} 
          onChange={(e) => onChange("name", e.target.value)} 
          sx={inputStyle} 
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <Typography variant="caption" fontWeight="800" color="text.secondary">CATEGORY</Typography>
        <TextField 
            fullWidth select variant="filled" hiddenLabel 
            value={data.category || "Seating"} 
            onChange={(e) => onChange("category", e.target.value)}
            sx={inputStyle}
        >
            <MenuItem value="Seating">Seating</MenuItem>
            <MenuItem value="Lighting">Lighting</MenuItem>
            <MenuItem value="Tables">Tables</MenuItem>
        </TextField>
      </Grid>
      <Grid size={{ xs: 6 }}>
        <Typography variant="caption" fontWeight="800" color="text.secondary">BASE PRICE (USD)</Typography>
        <TextField 
          fullWidth variant="filled" hiddenLabel 
          value={data.price} 
          onChange={(e) => onChange("price", Number(e.target.value))} 
          InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} 
          sx={inputStyle} 
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant="caption" fontWeight="800" color="text.secondary">DETAILED DESCRIPTION</Typography>
        <TextField 
          fullWidth multiline rows={4} variant="filled" hiddenLabel 
          value={data.description} 
          onChange={(e) => onChange("description", e.target.value)} 
          sx={inputStyle} 
        />
      </Grid>
    </Grid>
  </Paper>
);

const inputStyle = { mt: 1, "& .MuiFilledInput-root": { bgcolor: "#f1f5f9", borderRadius: 2, fontWeight: 700, "&:before, &:after": { display: "none" } } };

export default DetailsForm;