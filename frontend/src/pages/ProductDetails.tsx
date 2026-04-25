import { useEffect, useCallback, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
   Typography, 
   Alert, 
   Snackbar,
   Box
  } from "@mui/material"; 
  import Grid from "@mui/material/Grid2";

import type { AppDispatch, RootState } from "../app/store";
import { fetchProductById, clearProduct } from "../features/product/productSlice";
import { addItemToCart } from "../features/cart/cartSlice";

import type { Product } from "../types/product";

import ProductLayout from "../components/products/ProductLayout";
import Loading from "../components/common/Loading";
import ProductInfo from "../components/products/ProductInfo";
import ReviewSection from "../components/products/reviews/ReviewSection";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { product, products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = useCallback(
    async (qty: number) => { 
      if (!product) return;

      const resultAction = await dispatch(
        addItemToCart({
          productId: product._id,
          quantity: qty,
        })
      );

      if (addItemToCart.fulfilled.match(resultAction)) {
        setOpen(true);
      }
    },
    [dispatch, product]
  );

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  if (loading && !product) return <Loading message="Fetching product details..." />;

  if (error) {
    return (
      <ProductLayout>
        <Box py={4}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </ProductLayout>
    );
  }

  if (!product) {
    return (
      <ProductLayout>
        <Box py={4}>
          <Alert severity="info">Product not found</Alert>
        </Box>
      </ProductLayout>
    );
  }

  return (
    <ProductLayout>
      <Box sx={{ py: 6 }}>
        {/* Main Product Section */}
        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src={product.image || ""}
              alt={product.name}
              sx={{
                width: "100%",
                borderRadius: 2,
                bgcolor: "#f6f7fb",
                objectFit: "contain",
                maxHeight: "600px",
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ProductInfo product={product} onAddToCart={handleAddToCart} />
          </Grid>
        </Grid>

        <ReviewSection product={product} />

        <Box sx={{ mt: 10 }}>
          <Typography variant="h5" fontWeight="900" mb={4}>
            Complete the Collection
          </Typography>

          <Grid container spacing={3}>
            {products
              .filter((p: Product) => p._id !== product._id)
              .slice(0, 4)
              .map((item: Product) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item._id}>
                  <Box
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/product/${item._id}`)}
                  >
                    <Box
                      component="img"
                      src={item.image || ""}
                      alt={item.name}
                      sx={{
                        width: "100%",
                        borderRadius: 1,
                        bgcolor: "#f6f7fb",
                        mb: 1,
                        aspectRatio: "1/1",
                        objectFit: "cover"
                      }}
                    />
                    <Typography variant="subtitle2" fontWeight="900">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>

      <Snackbar 
        open={open} 
        autoHideDuration={4000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleClose} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%', fontWeight: 'bold' }}
        >
          {product.name} added to your selection.
        </Alert>
      </Snackbar>
    </ProductLayout>
  );
};

export default ProductDetails;