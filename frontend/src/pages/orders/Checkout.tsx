import { useState, useEffect } from "react"; 
import { 
  Container, 
   Grid, 
  Typography, 
  Box, 
  Button, 
  Paper,
  Alert,
  Stack,
  CircularProgress 
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { RootState, AppDispatch } from "../../app/store";
import { processCheckout, fetchPaymentSecret } from "../../features/order/orderSlice";
import { fetchCart } from "../../features/cart/cartSlice";
import type { PaymentMethod } from "../../types/order";

import PaymentMethodSelector from "../../components/checkout/PaymentMethodSelector";
import OrderSummary from "../../components/checkout/OrderSummary";
import StripePaymentForm from "../../components/checkout/StripePaymentForm";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { cart, loading: cartLoading } = useSelector((state: RootState) => state.cart);
  const { loading: orderLoading, error, clientSecret } = useSelector((state: RootState) => state.orders);

  const [method, setMethod] = useState<PaymentMethod>("card");

  useEffect(() => {
    if (!cart && !cartLoading) {
      dispatch(fetchCart());
    }
  }, [cart, cartLoading, dispatch]);

  useEffect(() => {
    if (cart && cart.items.length === 0 && !cartLoading) {
      navigate("/cart"); 
    }
  }, [cart, cartLoading, navigate]);

  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) return;
 
    const selectedItemIds = cart.items.map((item) => item._id);

    try {
  
      const order = await dispatch(
        processCheckout({
          paymentMethod: method,
          selectedItems: selectedItemIds,
        })
      ).unwrap();

      if (method === "card") {
        await dispatch(fetchPaymentSecret({ orderId: order._id })).unwrap();
      } else {
        navigate("/order/success", { state: { order } });
      }
    } catch (err) {
      console.error("Checkout sequence failed", err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 4, borderRadius: 1 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={8}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="h4" fontWeight="900" gutterBottom sx={{ letterSpacing: "-0.02em" }}>
            Payment Details
          </Typography>
          <Typography color="text.secondary" mb={6}>
            Choose your preferred payment method to complete your curation.
          </Typography>

          <PaymentMethodSelector method={method} onSelect={setMethod} />

          <Box sx={{ 
            p: 4, 
            bgcolor: "#fff", 
            borderRadius: 1, 
            border: "1px solid #f0f0f0",
            minHeight: "200px",
            mt: 2
          }}>
            {method === "card" ? (
              clientSecret ? (
                <StripePaymentForm />
              ) : (
                <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ height: "100%", py: 4 }}>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Review your order total on the right, then click the button below 
                    to securely enter your card details.
                  </Typography>
                </Stack>
              )
            ) : (
              <Box sx={{ p: 3, bgcolor: "#f3f4f6", borderRadius: 1 }}>
                <Typography variant="body2" fontWeight="900" gutterBottom>
                  CASH ON DELIVERY
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  You will pay the total amount in cash when the package is delivered to your door. 
                  A confirmation email will be sent shortly.
                </Typography>
              </Box>
            )}
          </Box>

          <Box mt={10} display="flex" justifyContent="space-between" alignItems="center">
            <Button 
              color="inherit" 
              sx={{ fontWeight: "900", fontSize: "0.8rem", letterSpacing: "0.1em" }} 
              onClick={() => navigate("/cart")}
            >
              ← RETURN TO CART
            </Button>
            {!clientSecret && (
              <Button
                variant="contained"
                size="large"
                disabled={orderLoading || cartLoading || !cart?.items.length}
                onClick={handleCheckout}
                sx={{ 
                  bgcolor: "#0047ab", 
                  px: 6, 
                  py: 1.5,
                  fontWeight: "900",
                  borderRadius: 1,
                  "&:hover": { bgcolor: "#003580" }
                }}
              >
                {orderLoading ? "PROCESSING..." : method === "card" ? "CONFIRM & PAY" : "PLACE CASH ORDER"}
              </Button>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          {cart && cart.items.length > 0 ? (
            <OrderSummary /> 
          ) : (
            <Paper 
              sx={{ p: 4, bgcolor: '#f9f9f9', textAlign: 'center', minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }}
              elevation={0}
            >
              <Stack alignItems="center" spacing={2}>
                <CircularProgress size={24} sx={{ color: '#0047ab' }} />
                <Typography variant="caption" color="text.secondary" fontWeight="700">
                  REFRESHING YOUR SELECTION...
                </Typography>
              </Stack>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;