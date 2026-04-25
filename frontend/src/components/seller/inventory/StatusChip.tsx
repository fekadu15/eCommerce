import { Box } from "@mui/material";

interface StatusChipProps {
  stock: number;
}

const StatusChip = ({ stock }: StatusChipProps) => {
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock < 10;

  const getStyles = () => {
    if (isOutOfStock) {
      return {
        label: "OUT OF STOCK",
        color: "#991b1b", 
        bgcolor: "#fef2f2",
      };
    }
    if (isLowStock) {
      return {
        label: "LOW STOCK",
        color: "#92400e", 
        bgcolor: "#fffbeb",
      };
    }
    return {
      label: "IN STOCK",
      color: "#166534", 
      bgcolor: "#f0fdf4",
    };
  };

  const { label, color, bgcolor } = getStyles();

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.5,
        py: 0.5,
        borderRadius: 10,
        fontSize: "0.65rem",
        fontWeight: 900,
        letterSpacing: 0.5,
        bgcolor: bgcolor,
        color: color,
        border: `1px solid ${color}20`, 
      }}
    >

      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: "currentColor",
          mr: 1,
        }}
      />
      {label}
    </Box>
  );
};

export default StatusChip;