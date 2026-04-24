import { 
  Box, Container, Typography, Button, Paper, Stack 
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useLocation } from "react-router-dom";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ReceiptIcon from '@mui/icons-material/Receipt';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const orderDetails = location.state?.order;

  return (
    <Container maxWidth="sm" sx={{ py: 15, textAlign: 'center' }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 6, 
          borderRadius: 2, 
          border: '1px solid #e0e0e0',
          bgcolor: '#fafafa' 
        }}
      >
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        
        <Typography variant="h3" fontWeight="900" gutterBottom>
          Order Placed!
        </Typography>
        
        <Typography variant="body1" color="text.secondary" mb={4}>
          Thank you for your purchase. Your order has been received and is being processed.
        </Typography>

        {orderDetails && (
          <Box 
            sx={{ 
              mb: 4, 
              p: 3, 
              bgcolor: '#fff', 
              border: '1px dashed #ccc', 
              textAlign: 'left' 
            }}
          >
            <Stack direction="row" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle2" color="text.secondary">Order ID:</Typography>
              <Typography variant="subtitle2" fontWeight="bold">
                #{orderDetails._id.toUpperCase()}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2" color="text.secondary">Amount Paid:</Typography>
              <Typography variant="subtitle2" fontWeight="bold" color="primary">
                ${orderDetails.totalPrice.toLocaleString()}
              </Typography>
            </Stack>
          </Box>
        )}

        <Stack spacing={2}>
          <Button 
            variant="contained" 
            fullWidth
            size="large"
            startIcon={<ReceiptIcon />}
            onClick={() => navigate('/order/myorders')}
            sx={{ bgcolor: '#0047ab', fontWeight: '900', py: 1.5 }}
          >
            View Order History
          </Button>
          
          <Button 
            variant="outlined" 
            fullWidth
            size="large"
            startIcon={<ShoppingBagIcon />}
            onClick={() => navigate('/')}
            sx={{ fontWeight: '900', py: 1.5, color: '#0047ab', borderColor: '#0047ab' }}
          >
            Continue Shopping
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default SuccessPage;