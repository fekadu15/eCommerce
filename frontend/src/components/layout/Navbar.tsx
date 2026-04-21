import { useState } from "react";
import { Box, Typography, Stack, InputBase, Badge, IconButton } from "@mui/material";
import { Search, LocalMallOutlined, PersonOutline, LogoutOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import type { RootState, AppDispatch } from "../../app/store";
import { logout } from "../../features/auth/authSlice"; 

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");

  const { user } = useSelector((state: RootState) => state.auth);
  const { cart } = useSelector((state: RootState) => state.cart);

  const cartCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${search}`);
    }
  };

  return (
    <Box
      component="nav"
      sx={{
        maxWidth: "100vw", 
        bgcolor: "white",
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        px: { xs: 2, md: 8 },
        py: 2,
        boxSizing: "border-box", 
        overflow: "hidden" 
      }}
    >
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between"
        spacing={2} 
      >
        
        <Stack direction="row" spacing={{ xs: 2, md: 4 }} alignItems="center">
          <Typography
            variant="h5"
            fontWeight="900"
            sx={{ 
              cursor: "pointer", 
              letterSpacing: -1.5, 
              textTransform: 'uppercase',
              fontSize: { xs: '1.2rem', md: '1.5rem' } 
            }}
            onClick={() => navigate("/")}
          >
            Curator
          </Typography>

          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: { xs: "none", sm: "flex" }, 
              bgcolor: "#f4f4f4",
              px: 1.5,
              py: 0.5,
              width: { sm: "180px", md: "250px" } 
            }}
          >
            <Search sx={{ color: "text.secondary", fontSize: 20, mr: 1 }} />
            <InputBase
              placeholder="SEARCH..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ fontSize: "0.8rem", fontWeight: "bold", width: "100%" }}
            />
          </Box>
        </Stack>

       
        <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', lg: 'flex' } }}>
          <Typography variant="body2" sx={navLinkStyle} onClick={() => navigate("/")}>PRODUCTS</Typography>
          <Typography variant="body2" sx={navLinkStyle} onClick={() => navigate("/order/myorders")}>orders</Typography>
          <Typography variant="body2" sx={navLinkStyle} onClick={() => navigate("/about")}>ABOUT</Typography>
          {!user ? (
            <>
              <Typography variant="body2" sx={navLinkStyle} onClick={() => navigate("/register")}>REGISTER</Typography>
              <Typography variant="body2" sx={navLinkStyle} onClick={() => navigate("/login")}>SIGN IN</Typography>
            </>
          ) : (
            <Typography variant="body2" sx={navLinkStyle} onClick={() => navigate("/profile")}>ACCOUNT</Typography>
          )}
        </Stack>

       
        <Stack direction="row" spacing={{ xs: 0.5, md: 1 }} alignItems="center">
          <IconButton size="small" onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartCount} color="primary">
              <LocalMallOutlined sx={{ fontSize: 22 }} />
            </Badge>
          </IconButton>

          {user ? (
            <IconButton size="small" onClick={handleLogout}>
              <LogoutOutlined sx={{ fontSize: 22 }} />
            </IconButton>
          ) : (
            <IconButton size="small" onClick={() => navigate("/login")}>
              <PersonOutline sx={{ fontSize: 22 }} />
            </IconButton>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

const navLinkStyle = {
  cursor: "pointer",
  fontWeight: "700",
  textTransform: 'uppercase',
  letterSpacing: 1,
  whiteSpace: 'nowrap', 
  '&:hover': { color: 'primary.main' }
};

export default Navbar;