import { useEffect } from "react";
import { Container, Typography, Box, Stack, CircularProgress, Paper, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchMyOrders, cancelOrderAction } from "../../features/order/orderSlice"; 
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import OrderItem from "../../components/order/OrderItem";

const OrderHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { orders, loading } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const handleCancel = (orderId: string) => {
    if (window.confirm("Are you sure you want to cancel this order? Items will return to stock.")) {
      dispatch(cancelOrderAction(orderId));
    }
  };

  if (loading && orders.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress sx={{ color: '#0047ab' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={6}>
        <ReceiptLongIcon sx={{ fontSize: 40 }} />
        <Typography variant="h3" fontWeight="900" sx={{ letterSpacing: "-0.04em" }}>
          My Orders
        </Typography>
      </Stack>

      {orders.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 0, bgcolor: '#f9f9f9' }} elevation={0}>
          <Typography variant="h6" mb={2}>You haven't placed any orders yet.</Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            sx={{ bgcolor: '#0047ab', fontWeight: '900' }}
          >
            Start Shopping
          </Button>
        </Paper>
      ) : (
        <Stack spacing={4}>
          {orders.map((order) => (
            <OrderItem 
              key={order._id} 
              order={order} 
              onCancel={handleCancel} 
            />
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default OrderHistory;