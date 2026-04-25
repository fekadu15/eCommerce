import { Paper, Typography, TextField, Grid2 as Grid, InputAdornment, MenuItem } from "@mui/material";


export interface DetailsFormData {
  name: string;
  category: string;
  price: number;
  description: string;
}

interface Props<T extends DetailsFormData> {
  data: T;
  onChange: (field: keyof T, val: string | number) => void;
  errors?: Partial<Record<keyof T, string>>; 
}

const DetailsForm = <T extends DetailsFormData>({ data, onChange, errors }: Props<T>) => (
  <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid #eee" }}>
    <Typography variant="h6" fontWeight="900" sx={{ mb: 3 }}>
      Architectural Identity
    </Typography>
    <Grid container spacing={3}>
  
      <Grid size={{ xs: 12 }}>
        <Typography variant="caption" fontWeight="800" color="text.secondary">PRODUCT NAME</Typography>
        <TextField 
          fullWidth variant="filled" hiddenLabel 
          value={data.name} 
          onChange={(e) => onChange("name" as keyof T, e.target.value)} 
          error={!!errors?.name}
          helperText={errors?.name as string}
          sx={inputStyle} 
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <Typography variant="caption" fontWeight="800" color="text.secondary">CATEGORY</Typography>
        <TextField 
          fullWidth select variant="filled" hiddenLabel 
          value={data.category || "Seating"} 
          onChange={(e) => onChange("category" as keyof T, e.target.value)}
          error={!!errors?.category}
          helperText={errors?.category as string}
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
          type="number"
          value={data.price} 
          onChange={(e) => onChange("price" as keyof T, Number(e.target.value))} 
          error={!!errors?.price}
          helperText={errors?.price as string}
          InputProps={{ 
            startAdornment: <InputAdornment position="start">$</InputAdornment> 
          }} 
          sx={inputStyle} 
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Typography variant="caption" fontWeight="800" color="text.secondary">DETAILED DESCRIPTION</Typography>
        <TextField 
          fullWidth multiline rows={4} variant="filled" hiddenLabel 
          value={data.description} 
          onChange={(e) => onChange("description" as keyof T, e.target.value)} 
          error={!!errors?.description}
          helperText={errors?.description as string}
          sx={inputStyle} 
        />
      </Grid>
    </Grid>
  </Paper>
);

const inputStyle = { 
  mt: 1, 
  "& .MuiFilledInput-root": { 
    bgcolor: "#f1f5f9", 
    borderRadius: 2, 
    fontWeight: 700, 
    "&:before, &:after": { display: "none" } 
  },
  "& .MuiFormHelperText-root": { 
    fontWeight: 700, 
    mx: 0,
    color: "#d32f2f" 
  } 
};

export default DetailsForm;