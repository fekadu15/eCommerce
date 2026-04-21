import { Paper, Stack, Box, Typography, Radio } from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import type { PaymentMethod } from "../../types/order";

interface Props {
  method: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

const PaymentMethodSelector = ({ method, onSelect }: Props) => {
  const methods = [
    { id: 'card' as PaymentMethod, title: 'Card Payment', sub: 'Secure via Stripe', icon: <CreditCardIcon /> },
    { id: 'cash' as PaymentMethod, title: 'Cash on Delivery', sub: 'Pay upon arrival', icon: <LocalShippingIcon /> }
  ];

  return (
    <Stack direction="row" spacing={2} mb={4}>
      {methods.map((item) => (
        <Paper
          key={item.id}
          variant="outlined"
          onClick={() => onSelect(item.id)}
          sx={{
            p: 3, flex: 1, cursor: 'pointer',
            transition: '0.2s',
            border: method === item.id ? '2px solid #1976d2' : '1px solid #eee',
            bgcolor: method === item.id ? 'rgba(25, 118, 210, 0.02)' : 'white'
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ color: method === item.id ? 'primary.main' : 'text.disabled' }}>
                {item.icon}
              </Box>
              <Box>
                <Typography variant="subtitle2" fontWeight="900">{item.title}</Typography>
                <Typography variant="caption" color="text.secondary">{item.sub}</Typography>
              </Box>
            </Stack>
            <Radio checked={method === item.id} size="small" />
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};

export default PaymentMethodSelector;