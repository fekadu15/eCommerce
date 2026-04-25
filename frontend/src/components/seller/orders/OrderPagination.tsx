import { Stack, Typography, IconButton, Box } from "@mui/material";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

const OrderPagination = () => {
  const { sellerOrders, stats } = useSelector((state: RootState) => state.orders);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="caption" color="text.secondary" fontWeight="800">
        Showing {sellerOrders.length} of {stats?.totalOrders || 0} orders
      </Typography>
      
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton size="small" sx={{ border: "1px solid #e2e8f0", borderRadius: 2 }}><ChevronLeftRounded /></IconButton>
        <Box sx={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2, fontWeight: 900, fontSize: "0.85rem", bgcolor: "#0047ab", color: "white" }}>1</Box>
        <IconButton size="small" sx={{ border: "1px solid #e2e8f0", borderRadius: 2 }}><ChevronRightRounded /></IconButton>
      </Stack>
    </Stack>
  );
};

export default OrderPagination;