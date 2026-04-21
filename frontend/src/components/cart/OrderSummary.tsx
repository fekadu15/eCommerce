import { Box, Typography, Stack, Button, Divider, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  subtotal: number;
}

const OrderSummary = ({ subtotal }: Props) => {
  const navigate = useNavigate();
  const shipping = subtotal > 0 ? 20 : 0;
  const total = subtotal + shipping;

  return (
    <Box sx={{ 
      bgcolor: "white", 
      p: 4, 
      border: "1px solid #eee", 
      position: "sticky", 
      top: 20 
    }}>
      <Typography variant="h6" fontWeight="900" sx={{ mb: 3 }}>
        ORDER SUMMARY
      </Typography>
      
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="text.secondary">Subtotal</Typography>
          <Typography fontWeight="bold">${subtotal.toLocaleString()}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="text.secondary">Shipping</Typography>
          <Typography fontWeight="bold">${shipping.toLocaleString()}</Typography>
        </Stack>
      </Stack>
      
      <Divider sx={{ mb: 3 }} />
      
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 4 }}>
        <Typography variant="body2" fontWeight="900">TOTAL</Typography>
        <Typography variant="h4" fontWeight="900" color="primary">
          ${total.toLocaleString()}
        </Typography>
      </Stack>
      
      <Button 
        fullWidth 
        variant="contained" 
        disabled={subtotal === 0}
        sx={{ py: 2, fontWeight: "bold" }}
        onClick={() => navigate("/order/checkout")}
      >
        PROCEED TO CHECKOUT
      </Button>

      <Box sx={{ mt: 4 }}>
        <Typography variant="caption" fontWeight="900" color="gray" sx={{ display: "block", mb: 1 }}>
          PROMOTIONAL CODE
        </Typography>
        <Stack direction="row" spacing={1}>
          <TextField size="small" placeholder="Enter code" fullWidth />
          <Button variant="contained" color="secondary">APPLY</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default OrderSummary;