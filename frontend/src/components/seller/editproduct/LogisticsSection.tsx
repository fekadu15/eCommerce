import React from "react";
import { 
  Paper, Typography, Stack, IconButton, Grid2 as Grid, 
  InputBase, TextField, FormHelperText, Box 
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import AttributeManager from "./AttributeManager";

interface LogisticsSectionProps {
  stock: number;
  sku: string;
  error?: string; 
  onStockChange: (newStock: number) => void;
  onSkuChange?: (newSku: string) => void;
}

const LogisticsSection = ({ stock, sku, error, onStockChange }: LogisticsSectionProps) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      onStockChange(Math.max(0, value));
    } else if (e.target.value === "") {
      onStockChange(0);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid #eee" }}>
      <Typography variant="h6" fontWeight="900" sx={{ mb: 3 }}>
        Inventory Logistics
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 6 }}>
          <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: "uppercase" }}>
            Available Stock
          </Typography>
          
          <Box sx={{ mt: 1 }}>
            <Stack 
              direction="row" 
              alignItems="center" 
              sx={{ 
                bgcolor: "#f1f5f9", 
                borderRadius: 2, 
                p: 0.5, 
                width: "fit-content",
                border: error ? "1px solid #d32f2f" : "1px solid #e2e8f0"
              }}
            >
              <IconButton 
                size="small" 
                onClick={() => onStockChange(Math.max(0, stock - 1))}
                sx={{ color: "#64748b" }}
              >
                <Remove fontSize="small" />
              </IconButton>

              <InputBase
                value={stock}
                onChange={handleInputChange}
                type="number"
                inputProps={{ 
                  min: 0, 
                  style: { 
                    textAlign: 'center', 
                    width: '60px', 
                    fontWeight: 900,
                    fontSize: '1rem'
                  } 
                }}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                    display: "none",
                  },
                  "& input": {
                    MozAppearance: "textfield",
                  },
                }}
              />

              <IconButton 
                size="small" 
                onClick={() => onStockChange(stock + 1)}
                sx={{ color: "#0047ab" }}
              >
                <Add fontSize="small" />
              </IconButton>
            </Stack>
            
            {error && (
              <FormHelperText error sx={{ fontWeight: 700, mt: 0.5 }}>
                {error}
              </FormHelperText>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: "uppercase" }}>
            Serial/SKU Number
          </Typography>
          <TextField 
            fullWidth 
            variant="filled" 
            hiddenLabel 
            value={sku || "ARCH-CH-0024-ASH"} 
            slotProps={{
              input: { readOnly: true } // Since SKU is usually generated
            }}
            sx={inputStyle} 
          />
        </Grid>
      </Grid>

      <Typography 
        variant="caption" 
        fontWeight="800" 
        color="text.secondary" 
        sx={{ textTransform: "uppercase", display: 'block', mb: 1.5 }}
      >
        Product Attributes
      </Typography>
      <AttributeManager />
    </Paper>
  );
};

const inputStyle = { 
  mt: 1, 
  "& .MuiFilledInput-root": { 
    bgcolor: "#f1f5f9", 
    borderRadius: 2, 
    fontWeight: 700, 
    "&:before, &:after": { display: "none" } 
  } 
};

export default LogisticsSection;