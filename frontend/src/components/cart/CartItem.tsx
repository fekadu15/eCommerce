import { Box, Typography, Stack, Button, IconButton } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { removeItemFromCart, addItemToCart } from "../../features/cart/cartSlice";
import type { ICartItem } from "../../types/cart";

interface Props {
  item: ICartItem;
}

const CartItem = ({ item }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateQty = (delta: number) => {
    dispatch(addItemToCart({ productId: item.product._id, quantity: delta }));
  };

  return (
    <Box sx={{ bgcolor: "white", p: 3, display: "flex", gap: 3, border: "1px solid #eee" }}>
      <Box 
        component="img" 
        src={item.product.image} 
        sx={{ width: 140, height: 140, objectFit: "contain", bgcolor: "#f9f9f9" }} 
      />
      <Box sx={{ flex: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="caption" sx={{ color: "primary.main", fontWeight: "bold" }}>CURATED PIECE</Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ mt: 0.5 }}>{item.product.name}</Typography>
          </Box>
          <Typography variant="h6" fontWeight="900">${item.product.price.toLocaleString()}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 4 }}>
          <Stack direction="row" alignItems="center" sx={{ border: "1px solid #eee" }}>
            <IconButton size="small" onClick={() => handleUpdateQty(-1)} disabled={item.quantity <= 1}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ px: 2, fontWeight: "bold" }}>{item.quantity}</Typography>
            <IconButton size="small" onClick={() => handleUpdateQty(1)}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Button 
            startIcon={<DeleteOutlineIcon />} 
            onClick={() => dispatch(removeItemFromCart({ productId: item.product._id }))}
            sx={{ color: "brown", fontWeight: "bold", fontSize: "0.75rem" }}
          >
            REMOVE
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CartItem;