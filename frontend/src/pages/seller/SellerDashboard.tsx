import { useEffect } from "react";
import { Grid2 as Grid, Typography, Container, Stack, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LocalShippingRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";

import { fetchSellerOrders, fetchSellerStats } from "../../features/order/orderSlice";
import { fetchSellerProducts } from "../../features/product/productSlice";

import StatCard from "../../components/seller/dashboard/StatCard";
import SalesChart from "../../components/seller/dashboard/SalesChart";
import QuickActions from "../../components/seller/dashboard/QuickActions";
import RecentOrdersTable from "../../components/seller/dashboard/RecentOrdersTable";

const SellerDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { stats, sellerOrders } = useSelector((state: RootState) => state.orders);
  const { sellerProducts } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchSellerOrders());
    dispatch(fetchSellerStats());
    dispatch(fetchSellerProducts());
  }, [dispatch]);


  const handlePendingClick = () => {
    navigate('/seller/orders');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
 
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'flex-start', sm: 'center' }} 
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography 
            variant="overline" 
            fontWeight="900" 
            color="primary" 
            sx={{ letterSpacing: 1.5, display: 'block', mb: -0.5 }}
          >
            COMMAND CENTER
          </Typography>
          <Typography 
            variant="h3" 
            fontWeight="900" 
            sx={{ color: "#1e293b", letterSpacing: -2 }}
          >
            Overview
          </Typography>
        </Box>

        {(stats?.pendingFulfillment ?? 0) > 0 && (
          <Button 
            onClick={handlePendingClick} 
            variant="contained" 
            startIcon={<LocalShippingRounded />}
            sx={{ 
              bgcolor: "#fff7ed", 
              color: "#b45309", 
              fontWeight: 900, 
              borderRadius: 3, 
              boxShadow: 'none', 
              px: 3, 
              py: 1,
              border: '1px solid #ffedd5',
              textTransform: 'none',
              transition: 'all 0.2s ease-in-out',
              '&:hover': { 
                bgcolor: '#ffedd5', 
                boxShadow: 'none',
                transform: 'scale(1.02)' 
              },
            }}
          >
            {stats?.pendingFulfillment} orders pending shipment
          </Button>
        )}
      </Stack>

      <Grid container spacing={3}>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard 
            title="Total Revenue" 
            value={`$${(stats?.totalRevenue ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`} 
            change="+12.5%"
            status="up" 
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard 
            title="Total Orders" 
            value={stats?.totalOrders ?? 0} 
            change="+4.2%" 
            status="up" 
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard 
            title="Active Products" 
            value={sellerProducts.length} 
            status="stable" 
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <SalesChart />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <QuickActions />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <RecentOrdersTable 
            orders={sellerOrders.slice(0, 5)} 
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SellerDashboard;