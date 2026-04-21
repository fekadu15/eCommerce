import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Container, Alert, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";

import type { AppDispatch, RootState } from "../app/store";
import { fetchCart } from "../features/cart/cartSlice";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import Loading from "../components/common/Loading";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, loading, error } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const subtotal = cart?.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) || 0;

  if (loading && !cart) return <Loading message="Loading selection..." />;

  return (
    <Box sx={{ bgcolor: "#f6f7fb", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="overline" sx={{ color: "gray", letterSpacing: 2 }}>INVENTORY  SELECTION</Typography>
        <Typography variant="h3" fontWeight="900" sx={{ mt: 1, mb: 6 }}>Shopping Cart</Typography>

        {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            {cart?.items.length === 0 ? (
              <Box sx={{ p: 10, textAlign: "center", border: "2px dashed #ccc" }}>
                <Typography color="text.secondary">Selection is empty</Typography>
              </Box>
            ) : (
              <Stack spacing={2}>
                {cart?.items.map((item) => (
                  <CartItem key={item.product._id} item={item} />
                ))}
              </Stack>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <OrderSummary subtotal={subtotal} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;