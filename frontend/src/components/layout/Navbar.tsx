import { useState } from "react";
import { 
  Box, Typography, Stack, InputBase, Badge, IconButton, 
  Dialog, DialogTitle, DialogContent, DialogActions, Button 
} from "@mui/material";
import { Search, LocalMallOutlined, PersonOutline, LogoutOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { logout } from "../../features/auth/authSlice"; 

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false); 

  const { user } = useSelector((state: RootState) => state.auth);
  const { cart } = useSelector((state: RootState) => state.cart);
  const cartCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleConfirmLogout = () => {
    dispatch(logout());
    navigate("/login");
    setOpenLogoutConfirm(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${search}`);
  };

  return (
    <Box component="nav" sx={{
      maxWidth: "100vw", bgcolor: "white", borderBottom: "1px solid #eee",
      position: "sticky", top: 0, zIndex: 1000, px: { xs: 2, md: 8 }, py: 2,
      boxSizing: "border-box", overflow: "hidden" 
    }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Stack direction="row" spacing={{ xs: 2, md: 4 }} alignItems="center">
          <Typography
            variant="h5" fontWeight="900" onClick={() => navigate("/")}
            sx={{ cursor: "pointer", letterSpacing: -1.5, textTransform: 'uppercase', fontSize: { xs: '1.2rem', md: '1.5rem' } }}
          >
            Curator
          </Typography>

          <Box component="form" onSubmit={handleSearch} sx={{
            display: { xs: "none", sm: "flex" }, bgcolor: "#f4f4f4", px: 1.5, py: 0.5, width: { sm: "180px", md: "250px" } 
          }}>
            <Search sx={{ color: "text.secondary", fontSize: 20, mr: 1 }} />
            <InputBase
              placeholder="SEARCH..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ fontSize: "0.8rem", fontWeight: "bold", width: "100%" }}
            />
          </Box>
        </Stack>

        <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', lg: 'flex' } }}>
          <Typography variant="body2" sx={navLinkStyle} onClick={() => navigate("/")}>PRODUCTS</Typography>
          <Typography variant="body2" sx={navLinkStyle} onClick={() => navigate("/order/myorders")}>ORDERS</Typography>
          {!user ? (
            <>
              <Typography variant="body2" sx={navLinkStyle} onClick={() => navigate("/register")}>REGISTER</Typography>
              <Typography variant="body2" sx={navLinkStyle} onClick={() => navigate("/login")}>SIGN IN</Typography>
            </>
          ) : (
            <Typography variant="body2" sx={navLinkStyle} onClick={() => navigate("/profile")}>ACCOUNT</Typography>
          )}
          <Typography variant="body2" sx={navLinkStyle} onClick={() => navigate("/about")}>ABOUT</Typography>
        </Stack>

        <Stack direction="row" spacing={{ xs: 0.5, md: 1 }} alignItems="center">
          <IconButton size="small" onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartCount} color="primary">
              <LocalMallOutlined sx={{ fontSize: 22 }} />
            </Badge>
          </IconButton>

          {user ? (
            <IconButton size="small" onClick={() => setOpenLogoutConfirm(true)}>
              <LogoutOutlined sx={{ fontSize: 22 }} />
            </IconButton>
          ) : (
            <IconButton size="small" onClick={() => navigate("/login")}>
              <PersonOutline sx={{ fontSize: 22 }} />
            </IconButton>
          )}
        </Stack>
      </Stack>

      <Dialog open={openLogoutConfirm} onClose={() => setOpenLogoutConfirm(false)}>
        <DialogTitle sx={{ fontWeight: 900 }}>Wait! Sign out?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">Are you sure you want to end your session?</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenLogoutConfirm(false)} sx={{ fontWeight: 700, color: 'text.secondary' }}>Stay</Button>
          <Button onClick={handleConfirmLogout} variant="contained" color="error" sx={{ fontWeight: 900 }}>Yes, Sign out</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const navLinkStyle = {
  cursor: "pointer", fontWeight: "700", textTransform: 'uppercase',
  letterSpacing: 1, whiteSpace: 'nowrap', '&:hover': { color: 'primary.main' }
};

export default Navbar;