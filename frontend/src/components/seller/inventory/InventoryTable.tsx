import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Box, Stack, Typography, IconButton, LinearProgress 
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import type { Product } from "../../../types/product";
import StatusChip from "./StatusChip";

interface Props {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const InventoryTable = ({ products, onEdit }: Props) => {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: "1px solid #e0e0e0" }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ bgcolor: "#ffffff" }}>
          <TableRow>
            <TableCell sx={headStyle}>Product Details</TableCell>
            <TableCell sx={headStyle}>Price</TableCell>
            <TableCell sx={headStyle}>Inventory</TableCell>
            <TableCell sx={headStyle}>Status</TableCell>
            <TableCell align="right" sx={headStyle}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => {
            const isLowStock = row.stock > 0 && row.stock < 10;

            return (
              <TableRow key={row._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box 
                      component="img" 
                      src={row.image} 
                      sx={{ width: 48, height: 48, borderRadius: 1.5, bgcolor: "#f5f5f5", objectFit: "cover" }} 
                    />
                    <Box>
                      <Typography variant="subtitle2" fontWeight="800">{row.name}</Typography>
                      <Typography variant="caption" color="text.secondary">Architectural Piece</Typography>
                    </Box>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Typography fontWeight="700">${row.price.toLocaleString()}</Typography>
                </TableCell>

                <TableCell sx={{ minWidth: 120 }}>
                  <Stack spacing={0.5}>
                    <Typography variant="caption" fontWeight="800">{row.stock}</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.min((row.stock / 100) * 100, 100)} 
                      sx={{ 
                        height: 4, 
                        borderRadius: 2, 
                        bgcolor: "#eee", 
                        "& .MuiLinearProgress-bar": { 
                          bgcolor: isLowStock ? "#b45309" : "#0047ab" 
                        } 
                      }} 
                    />
                  </Stack>
                </TableCell>

                <TableCell>
                  <StatusChip stock={row.stock} />
                </TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => onEdit(row._id)}>
                    <MoreHoriz />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const headStyle = { 
  fontSize: "0.7rem", 
  fontWeight: 900, 
  textTransform: "uppercase", 
  color: "text.secondary", 
  py: 2 
};

export default InventoryTable;