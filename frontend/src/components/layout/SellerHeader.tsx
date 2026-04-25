import { useState } from "react";
import { Box, TextField, InputAdornment, Stack, IconButton, Badge, Typography, Avatar, Tooltip } from "@mui/material";
import { SearchRounded, NotificationsNoneRounded, GridViewRounded} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../app/store";

const SellerHeader = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/seller/orders?search=${searchTerm}`);
    }
  };

  return (
    <Box sx={{ 
      height: 70, bgcolor: "white", px: 4, display: "flex", 
      alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid #f1f5f9", position: "sticky", top: 0, zIndex: 10
    }}>
      
      <form onSubmit={handleSearch}>
        <TextField
          size="small"
          placeholder="Search orders, customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            width: { xs: 200, md: 400 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              bgcolor: "#f1f5f9",
              "& fieldset": { border: "none" }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded sx={{ color: "#94a3b8" }} />
              </InputAdornment>
            ),
          }}
        />
      </form>

      <Stack direction="row" spacing={1.5} alignItems="center">
        <Tooltip title="Notifications">
          <IconButton sx={{ color: "#475569" }} onClick={() => navigate('/order/myorders')}>
            <Badge variant="dot" color="error">
              <NotificationsNoneRounded />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Dashboard Overview">
          <IconButton sx={{ color: "#475569" }} onClick={() => navigate('/')}>
            <GridViewRounded />
          </IconButton>
        </Tooltip>

      
        <Typography 
          variant="body2" 
          fontWeight="800" 
          onClick={() => window.open(`/seller/inventory/${user?._id}`, "_blank")}
          sx={{ 
            color: "#0047ab", 
            cursor: "pointer", 
            px: 1, 
            display: { xs: 'none', sm: 'block' },
            '&:hover': { textDecoration: 'underline' } 
          }}
        >
          View Store
        </Typography>

        <Stack 
          direction="row" 
          spacing={1.5} 
          alignItems="center" 
          onClick={() => navigate('/profile')} 
          sx={{ cursor: 'pointer', ml: 1 }}
        >
          <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
             <Typography variant="body2" fontWeight="900" sx={{ color: '#1e293b', lineHeight: 1.2 }}>
               {user?.name || "Seller"}
             </Typography>
             <Typography variant="caption" fontWeight="700" sx={{ color: '#64748b' }}>
               Store Owner
             </Typography>
          </Box>
          <Avatar 
            src={user?.avatar || ""} 
            alt={user?.name}
            sx={{ 
              width: 40, height: 40, 
              border: "2px solid #f1f5f9", 
              bgcolor: "#0047ab",
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.1)' }
            }} 
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SellerHeader;