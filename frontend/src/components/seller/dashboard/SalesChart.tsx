import { useState, useMemo } from "react";
import { Paper, Typography, Stack, ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { startOfWeek, endOfWeek, isWithinInterval, subWeeks, subMonths, startOfMonth, endOfMonth, format } from "date-fns";

const SalesChart = () => {
  const [timeframe, setTimeframe] = useState<"monthly" | "weekly">("weekly");
  const { sellerOrders } = useSelector((state: RootState) => state.orders);

  const chartData = useMemo(() => {
    const now = new Date();

    if (timeframe === "weekly") {
      return [3, 2, 1, 0].map((weeksAgo) => {
        const targetDate = subWeeks(now, weeksAgo);
        const start = startOfWeek(targetDate);
        const end = endOfWeek(targetDate);

        const revenue = sellerOrders
          .filter((order) => isWithinInterval(new Date(order.createdAt), { start, end }))
          .reduce((sum, order) => sum + order.totalPrice, 0);

        return {
          name: weeksAgo === 0 ? "THIS WK" : `WK ${format(start, "d")}`,
          revenue,
        };
      });
    } else {
      return [3, 2, 1, 0].map((monthsAgo) => {
        const targetDate = subMonths(now, monthsAgo);
        const start = startOfMonth(targetDate);
        const end = endOfMonth(targetDate);

        const revenue = sellerOrders
          .filter((order) => isWithinInterval(new Date(order.createdAt), { start, end }))
          .reduce((sum, order) => sum + order.totalPrice, 0);

        return {
          name: format(start, "MMM"),
          revenue,
        };
      });
    }
  }, [sellerOrders, timeframe]);

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: "1px solid #f1f5f9", height: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h6" fontWeight="900" sx={{ color: "#1e293b", mb: 0.5 }}>
            Sales Performance
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight="700">
            Revenue growth based on {timeframe} activity
          </Typography>
        </Box>
        
        <ToggleButtonGroup
          value={timeframe}
          exclusive
          onChange={(_, val) => val && setTimeframe(val)}
          size="small"
          sx={{ bgcolor: "#f1f5f9", p: 0.5, borderRadius: 2.5 }}
        >
          <ToggleButton value="monthly" sx={{ border: 'none', borderRadius: 2, fontWeight: 800 }}>Monthly</ToggleButton>
          <ToggleButton value="weekly" sx={{ border: 'none', borderRadius: 2, fontWeight: 800 }}>Weekly</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Box sx={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontWeight: 700, fontSize: 12 }} 
              dy={10} 
            />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }} 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
            />
            <Bar 
              dataKey="revenue" 
              barSize={45}
              shape={(props: any) => {
                const { x, y, width, height, index } = props;
                const isLast = index === chartData.length - 1;
                return (
                  <rect 
                    x={x} 
                    y={y} 
                    width={width} 
                    height={height} 
                    rx={6} 
                    fill={isLast ? "#0047ab" : "#cbd5e1"} 
                    fillOpacity={isLast ? 0.8 : 0.4} 
                  />
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default SalesChart;