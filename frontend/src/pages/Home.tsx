import { useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Stack,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchAllProducts } from "../features/product/productSlice";
import ProductGrid from "../components/products/ProductGrid";
import ProductSidebar from "../components/products/ProductSidebar";
import PaginationBar from "../components/products/PaginationBar";
import Loading from "../components/common/Loading";

const Home = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (loading) return <Loading message="Loading products..." />;

  return (
    
    <Box sx={{ bgcolor: "#f6f7fb", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="xl">

        <Grid container spacing={4}>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 3 }}>
            <ProductSidebar />
          </Grid>

          {/* Main Content */}
          <Grid size={{ xs: 12, md: 9 }}>

            {/* Header */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ mb: 0.5 }}
                >
                  New Arrivals
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Discover curated products for you
                </Typography>
              </Box>

              <Select
                size="small"
                defaultValue="featured"
                sx={{
                  bgcolor: "white",
                  borderRadius: 2,
                  minWidth: 180,
                }}
              >
                <MenuItem value="featured">Sort by: Featured</MenuItem>
                <MenuItem value="low">Price: Low → High</MenuItem>
                <MenuItem value="high">Price: High → Low</MenuItem>
              </Select>
            </Stack>

            {/* Error */}
            {error && (
              <Typography color="error" mb={2}>
                {error}
              </Typography>
            )}

            {/* Products */}
            <ProductGrid products={products} />

            {/* Pagination */}
            <PaginationBar />

          </Grid>
        </Grid>

      </Container>
    </Box>
    
  );
};

export default Home;