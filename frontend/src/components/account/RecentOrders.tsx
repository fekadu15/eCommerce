import { Box, Typography, Stack, Paper, IconButton, Chip } from "@mui/material";
import { ShoppingCartOutlined, ChevronRight, LocalShippingOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Link } from "react-router-dom";
const RecentOrders = () => {
  const { orders } = useSelector((state: RootState) => state.orders);

  return (
    <Box >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Stack direction="row" spacing={1} alignItems="center">
          <ShoppingCartOutlined sx={{ color: "#0047ab" }} />
          <Typography variant="h6" fontWeight="900">Recent Orders</Typography>
        </Stack>
        <Typography
  component={Link}
  to="/order/myorders"
  variant="button"
  color="primary"
  fontWeight="900"
  sx={{ cursor: "pointer", fontSize: "0.7rem", textDecoration: "none" }}
>
  VIEW ALL
</Typography>
      </Stack>

      <Stack spacing={2}>
        {orders.slice(0, 2).map((order) => (
          <Paper 
            key={order._id}
            elevation={0}
            sx={{ p: 2, border: "1px solid #f3f4f6",bgcolor: "#f3f4f6", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ p: 1.5, bgcolor: "#e3f2fd", borderRadius: 2 }}>
                <LocalShippingOutlined />
              </Box> 
              <Box>
                <Typography variant="subtitle2" fontWeight="900">Order #{order._id.slice(-5).toUpperCase()}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Ordered on {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={3} alignItems="center">
              <Box textAlign="right">
                <Typography variant="subtitle2" fontWeight="900">${order.totalPrice.toLocaleString()}</Typography>
                <Chip 
                  label={order.status.toUpperCase()} 
                  size="small" 
                  sx={{ 
                    fontSize: "0.6rem", 
                    fontWeight: 900, 
                    bgcolor: order.status === "delivered" ? "#e8f5e9" : "#e3f2fd",
                    color: order.status === "delivered" ? "#2e7d32" : "#1565c0"
                  }} 
                />
              </Box>
              <IconButton size="small"><ChevronRight /></IconButton>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default RecentOrders;