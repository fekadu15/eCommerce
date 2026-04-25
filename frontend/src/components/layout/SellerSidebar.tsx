import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button } from "@mui/material";
import { 
  GridViewRounded, 
  Inventory2Outlined, 
  ShoppingBagOutlined,  
  EditOutlined, 
  LogoutOutlined,
  StorefrontOutlined
} from "@mui/icons-material";
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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        bgcolor: "#f3f4f6", 
        color: "white",
        boxShadow: "4px 0 10px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
    
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box 
          sx={{ 
            width: 40, height: 40, bgcolor: "#0047ab", 
            borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" 
          }}
        >
          <Typography variant="h6" color="white" fontWeight="900">A</Typography>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="900" sx={{ lineHeight: 1.2, letterSpacing: -0.5, color: "#0047ab" }}>
            Architect
          </Typography>
          <Typography variant="caption" color="grey.500" fontWeight="700" sx={{ textTransform: "uppercase", fontSize: "0.6rem" }}>
            Seller Portal
          </Typography>
        </Box>
      </Box>

      <List sx={{ px: 2, mt: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? "rgba(0, 71, 171, 0.15)" : "transparent",
                  color: isActive ? "#60a5fa" : "#94a3b8",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)", color: "#0047ab" },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: isActive ? 800 : 600 }} 
                />
                {isActive && (
                  <Box sx={{ width: 4, height: 20, bgcolor: "#0047ab", borderRadius: 2, ml: 1 }} />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ px: 2, pb: 4 }}>
        <Divider sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.1)" }} />
        
        <List>
          

          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, color: "#f87171", "&:hover": { bgcolor: "rgba(248, 113, 113, 0.1)" } }}>
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 700 }} />
            </ListItemButton>
          </ListItem>
        </List>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<StorefrontOutlined />}
          onClick={() => navigate("/")}
          sx={{ 
            mt: 2, 
            borderRadius: 2, 
            textTransform: "none", 
            fontWeight: 800, 
            color: "white",
            bgcolor:"#0047ab",
            borderColor: "rgba(255,255,255,0.2)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.05)", borderColor: "white" , color:"#60a5fa"}
          }}
        >
          View Store
        </Button>
      </Box>
    </Box>
  );
};

export default SellerSidebar;