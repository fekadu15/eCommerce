import { useState, useEffect } from "react"; 
import { Typography, Container, Stack, CircularProgress, Box, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchSellerOrders, fetchSellerStats } from "../../features/order/orderSlice";
import type { AppDispatch, RootState } from "../../app/store";

import OrderStats from "../../components/seller/orders/OrderStats";
import OrderFilters from "../../components/seller/orders/OrderFilters";
import OrderCard from "../../components/seller/orders/OrderCard";
import OrderPagination from "../../components/seller/orders/OrderPagination";

const OrderManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams(); 
  const [tabValue, setTabValue] = useState(0);

  const { sellerOrders, loading } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchSellerOrders());
    dispatch(fetchSellerStats());

    const statusFilter = searchParams.get("status");
    if (statusFilter === "pending") {
      setTabValue(1); 
    } else if (statusFilter === "shipped") {
      setTabValue(2);
    } else if (statusFilter === "delivered") {
      setTabValue(3);
    }
  }, [dispatch, searchParams]); 

  const filteredOrders = sellerOrders.filter((order) => {
    if (tabValue === 1) return order.status === "pending";
    if (tabValue === 2) return order.status === "shipped" || order.status === "in_transit";
    if (tabValue === 3) return order.status === "delivered";
    return true; 
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        fontWeight="900" 
        sx={{ mb: 4, letterSpacing: -1.5, color: "#1e293b" }}
      >
        Order Management
      </Typography>

      <OrderStats />
      
      <OrderFilters currentTab={tabValue} onTabChange={(newVal: number) => setTabValue(newVal)} />

      <Stack spacing={2} sx={{ mt: 3 }}>
        {loading && sellerOrders.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={30} sx={{ color: '#0047ab' }} />
          </Box>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))
        ) : (
          <Paper 
            sx={{ 
              p: 8, 
              textAlign: 'center', 
              borderRadius: 4, 
              border: '1px dashed #cbd5e1',
              bgcolor: 'transparent' 
            }} 
            elevation={0}
          >
            <Typography variant="h6" fontWeight="800" color="text.secondary">
              No {tabValue !== 0 ? "matching" : ""} orders found.
            </Typography>
          </Paper>
        )}
      </Stack>

      <OrderPagination />
    </Container>
  );
};

export default OrderManagement;