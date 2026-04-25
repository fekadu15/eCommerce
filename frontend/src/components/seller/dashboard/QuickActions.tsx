import { Paper, Typography, Button, Stack, Box, List, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import { AddBoxOutlined, FileDownloadOutlined, Bolt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const links = [
    { label: "Add New Product", icon: <AddBoxOutlined />, path: "/seller/edit-product" },
    { label: "Export Sales Report", icon: <FileDownloadOutlined />, path: "#" },
    
  ];

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3, borderRadius: 4, bgcolor: "#0047ab", color: "white", position: 'relative', overflow: 'hidden' }}>
        <Bolt sx={{ position: 'absolute', right: -10, top: -10, fontSize: 100, opacity: 0.1 }} />
        <Typography variant="h6" fontWeight="900" gutterBottom>Pro Plan Exclusive</Typography>
        <Typography variant="body2" sx={{ opacity: 0.8, mb: 3, fontWeight: 500 }}>
          Unlock deep analytics and AI-powered inventory forecasting.
        </Typography>
        <Button variant="contained" fullWidth sx={{ bgcolor: "white", color: "#0047ab", fontWeight: 900, borderRadius: 2 }}>
          Upgrade Today
        </Button>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 4, border: "1px solid #f1f5f9" }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9' }}>
          <Typography variant="caption" fontWeight="900" color="text.secondary">QUICK LINKS</Typography>
        </Box>
        <Stack disablePadding component={List}>
          {links.map((item) => (
            <ListItemButton key={item.label} onClick={() => navigate(item.path)} sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 36, color: '#64748b' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ variant: 'body2', fontWeight: 700, color: '#475569' }} />
            </ListItemButton>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default QuickActions;