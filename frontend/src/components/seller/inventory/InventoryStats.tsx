import { Grid2 as Grid, Paper, Typography, Stack, Box } from "@mui/material";
import { Inventory2Outlined, WarningAmberOutlined } from "@mui/icons-material";
import type { Product } from "../../types/product";

const InventoryStats = ({ products }: { products: Product[] }) => {
  const lowStockCount = products.filter(p => p.stock < 10 && p.stock > 0).length;
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper elevation={0} sx={statPaperStyle}>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography variant="caption" fontWeight="800" color="text.secondary">TOTAL ASSET VALUE</Typography>
              <Typography variant="h5" fontWeight="900" mt={0.5}>${totalValue.toLocaleString()}</Typography>
            </Box>
            <Box sx={iconBoxStyle("#e0f2fe", "#0369a1")}><Inventory2Outlined /></Box>
          </Stack>
        </Paper>
      </Grid>
      
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper elevation={0} sx={statPaperStyle}>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography variant="caption" fontWeight="800" color="text.secondary">LOW STOCK ALERTS</Typography>
              <Typography variant="h5" fontWeight="900" mt={0.5} color={lowStockCount > 0 ? "error.main" : "inherit"}>
                {lowStockCount}
              </Typography>
            </Box>
            <Box sx={iconBoxStyle("#fef2f2", "#991b1b")}><WarningAmberOutlined /></Box>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

const statPaperStyle = { p: 3, borderRadius: 3, border: "1px solid #e0e0e0" };
const iconBoxStyle = (bg: string, color: string) => ({
  width: 48, height: 48, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: bg, color: color
});

export default InventoryStats;