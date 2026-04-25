import { useEffect } from "react";
import { Box, Typography, Button, Stack, Breadcrumbs, Link } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSellerProducts, deleteProduct } from "../../features/product/productSlice";
import type { AppDispatch, RootState } from "../../app/store";

import InventoryStats from "../../components/seller/inventory/InventoryStats";
import InventoryTable from "../../components/seller/inventory/InventoryTable";
import Loading from "../../components/common/Loading";

const InventoryManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { sellerProducts, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  const handleDelete = (id: string) => {
   
    if (window.confirm("Remove this architectural piece from inventory?")) {
      dispatch(deleteProduct(id));
    }
  };

  if (loading && sellerProducts.length === 0) return <Loading />;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f8f9fa", minHeight: "100vh" , }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
        <Box>
          <Breadcrumbs sx={{ mb: 1, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
            <Link underline="hover" color="inherit" href="#">Dashboard</Link>
            <Typography color="primary" sx={{ fontSize: "0.75rem", fontWeight: 700 }}>Inventory Management</Typography>
          </Breadcrumbs>
          <Typography variant="h4" fontWeight="900" sx={{ letterSpacing: -1 }}>
            Product Inventory
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage your curated collection of {sellerProducts.length} architectural pieces.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => navigate("/seller/edit-product")}
          sx={{ 
            bgcolor: "#0047ab", 
            fontWeight: 800, 
            px: 3, 
            py: 1.2, 
            borderRadius: 2,
            textTransform: "uppercase",
            fontSize: "0.8rem"
          }}
        >
          Add New Product
        </Button>
      </Stack>
      <InventoryStats products={sellerProducts} />

      <Box sx={{ mt: 4 }}>
        <InventoryTable 
          products={sellerProducts} 
          onDelete={handleDelete} 
          onEdit={(id) => navigate(`/seller/edit-product/${id}`)} 
        />
      </Box>
    </Box>
  );
};

export default InventoryManagement;