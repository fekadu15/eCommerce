import { Paper,Typography, Box, Chip, Divider, Button,  } from "@mui/material";
import type { Order } from "../../types/order";
import CancelIcon from '@mui/icons-material/Cancel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import OrderProductRow from "./OrderProductRow";
import Grid from "@mui/material/Grid2";
interface OrderItemProps {
  order: Order;
  onCancel: (id: string) => void;
}

const OrderItem = ({ order, onCancel }: OrderItemProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'cancelled': return 'error';
      default: return 'warning';
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4, border: '1px solid #eee', borderRadius: 1,
        transition: '0.3s', '&:hover': { borderColor: '#0047ab' },
        opacity: order.status === 'cancelled' ? 0.7 : 1 
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="caption" color="text.secondary" fontWeight="bold">
            ORDER ID: {order._id.toUpperCase()}
          </Typography>
          <Typography variant="body1" fontWeight="900" mt={1}>
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} sx={{ textAlign: { sm: 'right' } }}>
          <Chip 
            label={order.status.toUpperCase()} 
            color={getStatusColor(order.status) as any}
            size="small"
            sx={{ fontWeight: '900', borderRadius: 0 }}
          />
          <Typography variant="h6" fontWeight="900" mt={1} color="primary.main">
            ${order.totalPrice.toLocaleString()}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <OrderProductRow items={order.items} />

      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        {order.status === 'pending' && (
          <Button 
            startIcon={<CancelIcon />} 
            color="error" 
            size="small" 
            onClick={() => onCancel(order._id)}
            sx={{ fontWeight: '900' }}
          >
            Cancel Order
          </Button>
        )}
        <Button 
          startIcon={<LocalShippingIcon />} 
          size="small" 
          disabled={order.status === 'cancelled'}
          sx={{ fontWeight: '900' }}
        >
          Track Order
        </Button>
      </Box>
    </Paper>
  );
};

export default OrderItem;