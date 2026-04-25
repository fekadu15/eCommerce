import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Box, Stack, Typography, IconButton, LinearProgress, Tooltip 
} from "@mui/material";
import { EditOutlined, DeleteOutline } from "@mui/icons-material"; 
import type { Product } from "../../../types/product";
import StatusChip from "./StatusChip";
import type { SxProps, Theme } from "@mui/material/styles";

interface Props {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}


const headStyle: SxProps<Theme> = { 
  fontSize: "0.7rem", 
  fontWeight: 900, 
  textTransform: "uppercase", 
  color: "text.secondary", 
  py: 2 
};

const InventoryTable = ({ products, onEdit, onDelete }: Props) => {
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
          {products.map((row: Product) => {
            const isLowStock = row.stock > 0 && row.stock < 10;

            return (
              <TableRow key={row._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box 
                      component="img" 
                      src={row.image} 
                      alt={row.name}
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
                    <Typography variant="caption" fontWeight="800">{row.stock} in stock</Typography>
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
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Tooltip title="Edit Product">
                      <IconButton 
                        size="small" 
                        onClick={() => onEdit(row._id)}
                        sx={{ 
                          color: "text.secondary", 
                          "&:hover": { color: "primary.main", bgcolor: "rgba(0, 71, 171, 0.05)" } 
                        }}
                      >
                        <EditOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Delete Product">
                      <IconButton 
                        size="small" 
                        onClick={() => onDelete(row._id)}
                        sx={{ 
                          color: "text.secondary", 
                          "&:hover": { color: "error.main", bgcolor: "rgba(211, 47, 47, 0.05)" } 
                        }}
                      >
                        <DeleteOutline fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;