import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/product/${product._id}`)}
      sx={{
        borderRadius: 3,
        cursor: "pointer",
        overflow: "hidden",
        transition: "all 0.25s ease",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          bgcolor: "#f6f7fb",
          height: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          image={product.image || ""}
          alt={product.name}
          sx={{
            maxHeight: "80%",
            maxWidth: "80%",
            objectFit: "contain",
          }}
        />

        {product.stock < 5 && (
          <Chip
            label="LIMITED"
            size="small"
            color="error"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              fontWeight: 600,
              fontSize: "0.7rem",
              letterSpacing: 0.5,
            }}
          />
        )}
      </Box>

      {/* Content Section */}
      <CardContent sx={{ p: 2.5 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textTransform: "uppercase", letterSpacing: 1 }}
        >
          {product.category || "Category"}
        </Typography>

        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            mt: 0.5,
            mb: 1,
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <Rating
            value={product.rating}
            precision={0.5}
            size="small"
            readOnly
          />
          <Typography variant="caption" color="text.secondary">
            ({product.numReviews})
          </Typography>
        </Box>

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mt: 1.5 }}
        >
          ${product.price.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;