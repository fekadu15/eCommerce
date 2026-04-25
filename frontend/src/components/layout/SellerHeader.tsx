import { Box, TextField, InputAdornment, Stack, IconButton, Badge, Typography, Avatar } from "@mui/material";
import { SearchRounded, NotificationsNoneRounded, GridViewRounded } from "@mui/icons-material";

const SellerHeader = () => {
  return (
    <Box sx={{ 
      height: 70, bgcolor: "white", px: 4, display: "flex", 
      alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid #f1f5f9", position: "sticky", top: 0, zIndex: 10
    }}>
      {/* Search Bar */}
      <TextField
        size="small"
        placeholder="Search orders, customers..."
        sx={{ 
          width: 400,
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

      {/* Profile & Notifications */}
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton sx={{ color: "#475569" }}>
          <Badge variant="dot" color="error">
            <NotificationsNoneRounded />
          </Badge>
        </IconButton>
        <IconButton sx={{ color: "#475569" }}>
          <GridViewRounded />
        </IconButton>
        <Typography variant="body2" fontWeight="800" sx={{ color: "#0047ab", cursor: "pointer", px: 1 }}>
          View Store
        </Typography>
        <Avatar 
          src="/api/placeholder/40/40" 
          sx={{ width: 38, height: 38, border: "2px solid #f1f5f9", cursor: "pointer" }} 
        />
      </Stack>
    </Box>
  );
};

export default SellerHeader;