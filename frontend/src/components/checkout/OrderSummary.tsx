import { Paper, Typography, Stack, Box, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const OrderSummary = () => {

  const { currentOrder } = useSelector((state: RootState) => state.orders);
  const { cart } = useSelector((state: RootState) => state.cart);

  const items = currentOrder ? currentOrder.items : (cart?.items || []);

  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const shipping = subtotal > 0 ? 20 : 0;
  const tax = currentOrder 
    ? (currentOrder.totalPrice - subtotal - shipping) 
    : (subtotal * 0.08);
  const total = currentOrder ? currentOrder.totalPrice : (subtotal + tax + shipping);

  return (
    <Paper sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 0 }} elevation={0}>
      <Typography variant="h6" fontWeight="900" mb={3}>
        Order Summary
      </Typography>

  
      <Stack spacing={2} mb={3}>
        {items.map((item) => (
          <Stack key={item._id} direction="row" spacing={2} justifyContent="space-between">
            <Box 
              component="img" 
              src={item.product.image} 
              sx={{ 
                width: 60, 
                height: 60, 
                objectFit: 'contain', 
                bgcolor: 'white',
                border: '1px solid #eee',
                borderRadius: 1
              }} 
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight="bold">
                {item.product.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Qty: {item.quantity}
              </Typography>
            </Box>
            <Typography variant="body2" fontWeight="bold">
              ${(item.product.price * item.quantity).toLocaleString()}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

   
      <Stack spacing={1}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Subtotal</Typography>
          <Typography variant="body2" fontWeight="bold">
            ${subtotal.toLocaleString()}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Estimated Tax (8%)</Typography>
          <Typography variant="body2" fontWeight="bold">
            ${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Shipping</Typography>
          <Typography variant="body2" fontWeight="bold">
            ${shipping.toLocaleString()}
          </Typography>
        </Box>
        
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="h5" fontWeight="900">Total</Typography>
          <Typography variant="h5" fontWeight="900" color="primary.main">
            ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default OrderSummary;