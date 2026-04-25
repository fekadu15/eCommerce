import { useState } from "react";
import {
  Box,
  Typography,
  Slider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Stack,
} from "@mui/material";
import {
  GridViewRounded,
  DevicesRounded,
  CheckroomRounded,
  HomeOutlined,
} from "@mui/icons-material";

const categories = [
  { name: "All Products", icon: <GridViewRounded fontSize="small" /> },
  { name: "Electronics", icon: <DevicesRounded fontSize="small" /> },
  { name: "Fashion", icon: <CheckroomRounded fontSize="small" /> },
  { name: "Home", icon: <HomeOutlined fontSize="small" /> },
];

const brands = ["Architect", "Monolith", "Vanguard"];

const ProductSidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  return (
    <Stack spacing={3} sx={{ width: 260 }}>
      {/* Main Filter Container */}
      <Box sx={{ bgcolor: "#f3f4f6", borderRadius: 2, p: 2.5 }}>
        
        {/* Categories Section */}
        <Typography variant="overline" fontWeight="900" sx={{ color: "#64748b", mb: 1, display: "block" }}>
          CATEGORIES
        </Typography>
        <List disablePadding>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.name;
            return (
              <ListItemButton
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  bgcolor: isActive ? "#2563eb" : "transparent",
                  color: isActive ? "white" : "#475569",
                  "&:hover": { 
                    bgcolor: isActive ? "#2563eb" : "rgba(0,0,0,0.05)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 35 }}>
                  {cat.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={cat.name} 
                  primaryTypographyProps={{ fontSize: "0.85rem", fontWeight: 700 }} 
                />
              </ListItemButton>
            );
          })}
        </List>

        {/* Price Range Section */}
        <Typography variant="overline" fontWeight="900" sx={{ color: "#64748b", mt: 4, mb: 1, display: "block" }}>
          PRICE RANGE
        </Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            defaultValue={[0, 5000]}
            max={5000}
            size="small"
            sx={{
              color: "#2563eb",
              "& .MuiSlider-thumb": { width: 12, height: 12 },
            }}
          />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="caption" fontWeight="700" color="#94a3b8">$0</Typography>
            <Typography variant="caption" fontWeight="700" color="#94a3b8">$5,000+</Typography>
          </Stack>
        </Box>

        {/* Brands Section */}
        <Typography variant="overline" fontWeight="900" sx={{ color: "#64748b", mt: 4, mb: 1, display: "block" }}>
          BRANDS
        </Typography>
        <FormGroup>
          {brands.map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox 
                  size="small" 
                  defaultChecked={brand === "Monolith"} 
                  sx={{ color: "#cbd5e1", "&.Mui-checked": { color: "#2563eb" } }}
                />
              }
              label={
                <Typography variant="body2" fontWeight="600" color="#475569">
                  {brand}
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </Box>

      {/* The Promo Card (The Obsidian Collection) */}
      <Box
        sx={{
          height: 250,
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), transparent), url('https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=500')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          p: 2,
          color: "white"
        }}
      >
        <Box sx={{ bgcolor: "#ea580c", width: "fit-content", px: 1, borderRadius: 0.5, mb: 1 }}>
          <Typography sx={{ fontSize: "0.6rem", fontWeight: "900" }}>LIMITED EDITION</Typography>
        </Box>
        <Typography variant="subtitle1" fontWeight="900" lineHeight={1.2} mb={0.5}>
          The Obsidian Collection
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8, fontSize: "0.65rem" }}>
          Elevate your workspace with precision engineered tools.
        </Typography>
      </Box>
    </Stack>
  );
};

export default ProductSidebar;