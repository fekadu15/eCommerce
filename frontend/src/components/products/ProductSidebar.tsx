import {
  Box,
  Typography,
  Slider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const categories = ["All Products", "Electronics", "Fashion", "Home"];

const ProductSidebar = () => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 3,
        p: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        height: "fit-content",
      }}
    >
      <Typography fontWeight="bold" mb={2}>
        Categories
      </Typography>

      <List>
        {categories.map((cat, index) => (
          <ListItemButton
            key={cat}
            selected={index === 0}
            sx={{
              borderRadius: 2,
              mb: 0.5,
            }}
          >
            <ListItemText primary={cat} />
          </ListItemButton>
        ))}
      </List>

      <Box mt={4}>
        <Typography fontWeight="bold" mb={2}>
          Price Range
        </Typography>

        <Slider defaultValue={[0, 2000]} max={5000} />
      </Box>
    </Box>
  );
};

export default ProductSidebar;