import { Paper, Stack, Box, Typography, Button, Avatar, Chip, Grid2 as Grid } from "@mui/material";
import { LocalShippingRounded, Inventory2Rounded, ReceiptLongRounded } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { updateStatusAction } from "../../../features/order/orderSlice";
import type { Order } from "../../../types/order";
import OrderProductItem from "./OrderProductItem";
import type { AppDispatch } from "../../../app/store";
import moment from "moment";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const status = order.status.toUpperCase();
  const isPending = status === "PENDING";
  const isInTransit = status === "IN_TRANSIT";

  const handleStatusUpdate = () => {
    if (isPending) {
      dispatch(updateStatusAction({ id: order._id, status: "in_transit" }));
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, borderRadius: 4, border: "1px solid #f1f5f9", mb: 2,
        borderLeft: isPending ? "5px solid #b45309" : (isInTransit ? "5px solid #0047ab" : "1px solid #f1f5f9")
      }}
    >
      <Grid container spacing={3} alignItems="flex-start">
        <Grid size={{ xs: 12, md: 3 }}>
          <Stack direction="row" spacing={2}>
            <Avatar variant="rounded" sx={{ bgcolor: isPending ? "#fff7ed" : (isInTransit ? "#eff6ff" : "#f8fafc"), color: isPending ? "#b45309" : (isInTransit ? "#0047ab" : "#64748b"), borderRadius: 2.5 }}>
              {isPending ? <Inventory2Rounded /> : (isInTransit ? <LocalShippingRounded /> : <ReceiptLongRounded />)}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" fontWeight="900">Order #{order._id.slice(-6).toUpperCase()}</Typography>
              <Typography variant="caption" color="text.secondary" fontWeight="700">
                {moment(order.createdAt).fromNow()} • {order.items.length} Items
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Chip 
                  label={status} 
                  size="small" 
                  sx={{ 
                    fontWeight: 900, fontSize: "0.6rem", height: 20,
                    bgcolor: isPending ? "#fff7ed" : (isInTransit ? "#eff6ff" : "#f1f5f9"),
                    color: isPending ? "#b45309" : (isInTransit ? "#0047ab" : "#64748b")
                  }} 
                />
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: "uppercase" }}>Customer</Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
            <Avatar sx={{ width: 28, height: 28 }}>{order.user.name[0]}</Avatar>
            <Box>
              <Typography variant="caption" fontWeight="900" display="block" sx={{ lineHeight: 1 }}>{order.user.name}</Typography>
              <Typography variant="caption" color="text.secondary" fontWeight="700">{order.user.email}</Typography>
            </Box>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: "uppercase" }}>
            {isPending ? "Payment Method" : (isInTransit ? "Paid At" : "Status")}
          </Typography>
          <Typography variant="caption" display="block" fontWeight="800" sx={{ mt: 1, lineHeight: 1.2 }}>
            {isPending ? `Method: ${order.paymentMethod.toUpperCase()}` : (order.paidAt ? moment(order.paidAt).format('lll') : "Not Paid")}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }} sx={{ textAlign: "right" }}>
          <Typography variant="caption" fontWeight="800" color="text.secondary">TOTAL VALUE</Typography>
          <Typography variant="h5" fontWeight="900" sx={{ mt: 0.5, mb: 1.5, letterSpacing: -1 }}>
            ${order.totalPrice.toLocaleString()}
          </Typography>
          <Button 
            variant="contained" 
            fullWidth
            onClick={handleStatusUpdate}
            sx={{ 
              bgcolor: isPending ? "#0047ab" : "#f1f5f9", 
              color: isPending ? "white" : "#1e293b",
              fontWeight: 900, textTransform: "none", borderRadius: 2, boxShadow: "none",
              "&:hover": { bgcolor: isPending ? "#003580" : "#e2e8f0" }
            }}
          >
            {isPending ? "Mark as Shipped" : "View Details"}
          </Button>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box sx={{ borderTop: "1px solid #f1f5f9", pt: 2, mt: 1 }}>
            <Stack direction="row" spacing={2} sx={{ overflowX: 'auto' }}>
              {order.items.map((item) => (
                <OrderProductItem 
                  key={item._id}
                  name={item.product?.name || "Deleted Product"} 
                   qty={item.quantity} 
                     variant={item.product?.category || "Standard"} 
                     image={item.product?.image || ""}
                />
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OrderCard;