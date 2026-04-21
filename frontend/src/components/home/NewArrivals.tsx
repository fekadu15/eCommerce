import { Box, Typography, Stack, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import type { Product } from "../../types/product";
import ProductCard from "../products/ProductCard";

interface Props {
  products: Product[];
}

const NewArrivals = ({ products }: Props) => {
  return (
    <Box sx={{ py: 10 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ letterSpacing: -1 }}>
          NEW ARRIVALS
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton sx={{ border: "1px solid #eee", borderRadius: 0 }}>
            <ArrowBackIosNew sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton sx={{ border: "1px solid #eee", borderRadius: 0 }}>
            <ArrowForwardIos sx={{ fontSize: 16 }} />
          </IconButton>
        </Stack>
      </Stack>

      <Grid container spacing={4}>
        
        {products.slice(0, 4).map((product: Product) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewArrivals;