import { Stack, Tabs, Tab, Button, Box } from "@mui/material";
import { FilterListRounded, FileDownloadOutlined } from "@mui/icons-material";

interface OrderFiltersProps {
  currentTab: number;
  onTabChange: (newValue: number) => void;
}

const OrderFilters = ({ currentTab, onTabChange }: OrderFiltersProps) => {
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
      <Box sx={{ bgcolor: "#f1f5f9", p: 0.5, borderRadius: 3 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleChange}
          variant="scrollable"
          sx={{ 
            minHeight: 40,
            "& .MuiTabs-indicator": { display: "none" },
            "& .MuiTab-root": { 
              textTransform: "none", fontWeight: 800, fontSize: "0.85rem",
              minHeight: 40, borderRadius: 2.5, color: "#64748b",
              "&.Mui-selected": { bgcolor: "white", color: "#1e293b", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }
            }
          }}
        >
          <Tab label="All Orders" />
          <Tab label="Pending" />
          <Tab label="Shipped" />
          <Tab label="Delivered" />
        </Tabs>
      </Box>
      
      <Stack direction="row" spacing={1.5}>
        <Button variant="outlined" startIcon={<FilterListRounded fontSize="small" />} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 800, borderColor: "#e2e8f0", color: "#475569" }}>
          Filter
        </Button>
        <Button variant="outlined" startIcon={<FileDownloadOutlined fontSize="small" />} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 800, borderColor: "#e2e8f0", color: "#475569" }}>
          Export
        </Button>
      </Stack>
    </Stack>
  );
};

export default OrderFilters;