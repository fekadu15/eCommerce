import { Grid2 as Grid, Paper, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

const OrderStats = () => {
  const { stats, loading } = useSelector((state: RootState) => state.orders);

  const displayStats = [
    { label: "TOTAL ORDERS", value: stats?.totalOrders ?? 0 },
    { label: "PENDING FULFILLMENT", value: stats?.pendingFulfillment ?? 0, color: "#b45309" },
    { label: "IN TRANSIT", value: stats?.inTransit ?? 0, color: "#0047ab" }, 
    { label: "TOTAL REVENUE", value: `$${stats?.totalRevenue?.toLocaleString() ?? '0'}` },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {displayStats.map((stat) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #f1f5f9" }}>
            <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ letterSpacing: 0.5 }}>
              {stat.label}
            </Typography>
            {loading && !stats ? (
              <Skeleton width="60%" height={40} sx={{ mt: 1 }} />
            ) : (
              <Typography variant="h4" fontWeight="900" sx={{ mt: 1, color: stat.color || "#1e293b", letterSpacing: -1 }}>
                {stat.value}
              </Typography>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderStats;