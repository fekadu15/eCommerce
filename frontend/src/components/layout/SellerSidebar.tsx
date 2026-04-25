import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button } from "@mui/material";
import { GridViewRounded, Inventory2Outlined, ShoppingBagOutlined, EditOutlined, LogoutOutlined, StorefrontOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice"; 

const SellerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    { text: "Overview", icon: <GridViewRounded />, path: "/seller/dashboard" },
    { text: "Inventory", icon: <Inventory2Outlined />, path: "/seller/inventory" },
    { text: "Orders", icon: <ShoppingBagOutlined />, path: "/seller/orders" },
    { text: "Update", icon: <EditOutlined />, path: "/seller/edit-product" }
  ];

  return (
    <Box sx={{ width: 280, height: "100vh", bgcolor: "#f3f4f6", display: "flex", flexDirection: "column", position: "sticky", top: 0, zIndex: 100 }}>
      {/* Brand Header */}
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box sx={{ width: 40, height: 40, bgcolor: "#0047ab", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h6" color="white" fontWeight="900">A</Typography>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="900" sx={{ color: "#0047ab", lineHeight: 1.2 }}>Architect</Typography>
          <Typography variant="caption" color="grey.500" fontWeight="700">Seller Portal</Typography>
        </Box>
      </Box>

      {/* Main Links */}
      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton onClick={() => navigate(item.path)} sx={{ borderRadius: 2, bgcolor: isActive ? "rgba(0, 71, 171, 0.1)" : "transparent", color: isActive ? "#0047ab" : "#64748b" }}>
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isActive ? 800 : 600 }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Footer Actions */}
      <Box sx={{ p: 2, pb: 4 }}>
        <Divider sx={{ mb: 2 }} />
        
        {/* Switch to Shopping Mode */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<StorefrontOutlined />}
          onClick={() => navigate("/")}
          sx={{ mb: 1, borderRadius: 2, textTransform: "none", fontWeight: 800, bgcolor: "#0047ab" }}
        >
          Exit to Shopping
        </Button>

        <ListItemButton onClick={() => { dispatch(logout()); navigate("/login"); }} sx={{ borderRadius: 2, color: "#f87171" }}>
          <ListItemIcon sx={{ color: "inherit" }}><LogoutOutlined /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default SellerSidebar;