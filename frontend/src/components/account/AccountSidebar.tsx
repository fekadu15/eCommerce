import { useState } from "react";
import { 
  Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, 
  Avatar, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button 
} from "@mui/material";
import { 
  HomeOutlined, Person, NewReleasesOutlined, StarBorder, GridView, Logout 
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"; 
import { logout } from "../../features/auth/authSlice";
import type { RootState } from "../../app/store";

const menuItems = [
  { text: "Home", icon: <HomeOutlined />, path: "/" },
  { text: "Account", icon: <Person />, path: "/profile" },
  { text: "New Arrivals", icon: <NewReleasesOutlined />, path: "/new-arrivals" },
  { text: "Best Sellers", icon: <StarBorder />, path: "/best-sellers" },
  { text: "Categories", icon: <GridView />, path: "/categories" },
];

const AccountSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 
  const { user } = useSelector((state: RootState) => state.auth);
  
 
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);

  const handleConfirmLogout = () => {
    dispatch(logout());
    navigate("/login");
    setOpenLogoutConfirm(false);
  };

  return (
    <Box sx={{
      width: "100%", bgcolor: "#f3f4f6", maxWidth: 280, minHeight: "70vh",
      display: 'flex', flexDirection: 'column', boxShadow: "0 4px 20px rgba(0,0,0,0.08)" 
    }}>
      <Stack 
        direction="row" spacing={2} alignItems="center" 
        sx={{ p: 2, mb: 4, borderRadius: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
      >
        <Avatar sx={{ bgcolor: "#0047ab", width: 48, height: 48, fontWeight: 800 }}>
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </Avatar>
        <Box>
          <Typography variant="subtitle2" fontWeight="900" sx={{ lineHeight: 1.2 }}>
            Welcome back
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Curated for you
          </Typography>
        </Box>
      </Stack>

      <List component="nav" sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItemButton 
              key={item.text} 
              onClick={() => navigate(item.path)} 
              sx={{ 
                borderRadius: 2, mb: 1, bgcolor: isActive ? "#2b63f1" : "transparent",
                color: isActive ? "white" : "inherit",
                "&:hover": { bgcolor: isActive ? "#1a4bd3" : "#f3f4f6" }
              }}
            >
              <ListItemIcon sx={{ color: isActive ? "white" : "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontWeight: isActive ? 900 : 700, fontSize: "0.9rem" }} 
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ mt: 4 }}>
        <ListItemButton 
          onClick={() => setOpenLogoutConfirm(true)} // Open modal instead of logging out
          sx={{ borderRadius: 2, color: "#d32f2f", "&:hover": { bgcolor: "#fff1f1" } }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Sign Out" primaryTypographyProps={{ fontWeight: 800, fontSize: "0.9rem" }} />
        </ListItemButton>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutConfirm} onClose={() => setOpenLogoutConfirm(false)}>
        <DialogTitle sx={{ fontWeight: 900 }}>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography variant="body2">Are you sure you want to log out? You will need to sign in again to access your account.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenLogoutConfirm(false)} sx={{ fontWeight: 700, color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleConfirmLogout} variant="contained" color="error" sx={{ fontWeight: 900 }}>Logout</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountSidebar;