import { 
  Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Typography, Box, IconButton, Chip, Avatar 
} from "@mui/material";
import { MoreHorizRounded, PersonOutlineRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import type { Order } from "../../../types/order";

interface RecentOrdersTableProps {
  orders: Order[];
}

const RecentOrdersTable = ({ orders }: RecentOrdersTableProps) => {
  const navigate = useNavigate();

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'paid':
        return { bgcolor: '#f0fdf4', color: '#16a34a' }; 
      case 'pending':
      case 'processing':
        return { bgcolor: '#fff7ed', color: '#b45309' }; 
      case 'shipped':
      case 'in_transit':
        return { bgcolor: '#eff6ff', color: '#0047ab' }; 
      default:
        return { bgcolor: '#f1f5f9', color: '#64748b' }; 
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        borderRadius: 4, 
        border: "1px solid #f1f5f9", 
        mt: 1, 
        overflow: 'hidden' 
      }}
    >
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="900" sx={{ color: "#1e293b" }}>
          Recent Orders
        </Typography>
        <Typography 
          variant="button" 
          onClick={() => navigate('/seller/orders')}
          sx={{ 
            color: "#0047ab", 
            fontWeight: 800, 
            cursor: 'pointer',
            textTransform: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          View All Orders
        </Typography>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800, color: "#64748b", fontSize: '0.75rem', py: 1.5 }}>ORDER ID</TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#64748b", fontSize: '0.75rem', py: 1.5 }}>CUSTOMER</TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#64748b", fontSize: '0.75rem', py: 1.5 }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#64748b", fontSize: '0.75rem', py: 1.5 }}>AMOUNT</TableCell>
              <TableCell align="right" sx={{ py: 1.5 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  
                  <TableCell sx={{ fontWeight: 800, color: "#0047ab" }}>
                    #{order._id.slice(-6).toUpperCase()}
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ bgcolor: '#f1f5f9', color: '#64748b', width: 32, height: 32 }}>
                        <PersonOutlineRounded fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="800" sx={{ color: "#1e293b" }}>
                          {order.user?.name || "Unknown Customer"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight="600">
                          {order.user?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip 
                      label={order.status.replace('_', ' ').toUpperCase()} 
                      size="small"
                      sx={{ 
                        fontWeight: 900, 
                        fontSize: '0.65rem',
                        height: 24,
                        ...getStatusStyles(order.status)
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ fontWeight: 900, color: "#1e293b" }}>
                    ${order.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </TableCell>

                  <TableCell align="right">
                    <IconButton size="small">
                      <MoreHorizRounded />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary" fontWeight="700">
                    No recent orders found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RecentOrdersTable;