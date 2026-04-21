import { useState } from "react";
import { Box, Typography, Button, Stack, Rating, Divider, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import type { Product } from "../../types/product";

interface Props {
  product: Product;
  onAddToCart: (qty: number) => void;
}

const ProductInfo = ({ product, onAddToCart }: Props) => {
  const [qty, setQty] = useState(1);

  const handleQtyChange = (type: "inc" | "dec") => {
    if (type === "inc" && qty < product.stock) setQty(qty + 1);
    if (type === "dec" && qty > 1) setQty(qty - 1);
  };

  return (
    <Box>
      <Typography variant="overline" color="primary" fontWeight="bold" letterSpacing={2}>
        Architectural Series
      </Typography>
      
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 1, mt: 1 }}>
        {product.name}
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Rating value={product.rating} precision={0.5} readOnly size="small" />
        <Typography variant="body2" color="text.secondary">
          ({product.numReviews} Reviews)
        </Typography>
      </Stack>

      <Typography variant="h4" sx={{ mb: 4, fontWeight: 500 }}>
        ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
        {product.description}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          AVAILABILITY
        </Typography>
        <Typography variant="body2" color={product.stock > 0 ? "success.main" : "error.main"}>
          {product.stock > 0 ? `${product.stock} Units in Stock` : "Out of Stock"}
        </Typography>
      </Box>

      {product.stock > 0 && (
        <Stack direction="row" spacing={3} alignItems="center">
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              border: '1px solid #ddd',
              borderRadius: 0, // Keeping the ARCHITECT square aesthetic
              px: 1
            }}
          >
            <IconButton onClick={() => handleQtyChange("dec")} size="small">
              <Remove fontSize="small" />
            </IconButton>
            <Typography sx={{ mx: 2, minWidth: '20px', textAlign: 'center' }}>
              {qty}
            </Typography>
            <IconButton onClick={() => handleQtyChange("inc")} size="small">
              <Add fontSize="small" />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => onAddToCart(qty)}
            sx={{ 
              bgcolor: 'black', 
              color: 'white', 
              borderRadius: 0,
              py: 2,
              '&:hover': { bgcolor: '#333' }
            }}
          >
            ADD TO CART
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default ProductInfo;