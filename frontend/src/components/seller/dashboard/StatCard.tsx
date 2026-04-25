import { Paper, Typography, Box, Stack, Chip } from "@mui/material";
import { TrendingUpRounded, HorizontalRuleRounded } from "@mui/icons-material";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  status?: "up" | "stable" | "down";
}

const StatCard = ({ title, value, change, status }: StatCardProps) => (
  <Paper 
    elevation={0} 
    sx={{ 
      p: 3, 
      borderRadius: 4, 
      border: "1px solid #f1f5f9", 
      height: '100%',
      transition: 'transform 0.2s',
      '&:hover': { transform: 'translateY(-4px)' } 
    }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
      <Box>
        <Typography 
          variant="caption" 
          fontWeight="800" 
          color="text.secondary" 
          sx={{ letterSpacing: 1, textTransform: 'uppercase' }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h4" 
          fontWeight="900" 
          sx={{ mt: 1, color: "#1e293b", letterSpacing: -1 }}
        >
          {value}
        </Typography>
      </Box>
      
      {change && (
        <Chip 
          icon={status === "up" ? <TrendingUpRounded sx={{ fontSize: '1rem !important' }} /> : <HorizontalRuleRounded />}
          label={change}
          size="small"
          sx={{ 
            bgcolor: status === "up" ? "#f0fdf4" : "#f8fafc", 
            color: status === "up" ? "#16a34a" : "#64748b",
            fontWeight: 900,
            borderRadius: 1.5,
            "& .MuiChip-icon": { color: 'inherit' }
          }}
        />
      )}
    </Stack>
  </Paper>
);

export default StatCard;