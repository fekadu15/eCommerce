import { useEffect, useState } from "react";
import { 
  Box, Typography, Button, Stack, Breadcrumbs, Link, 
  Dialog, DialogTitle, DialogContent, DialogActions,
  CircularProgress, Snackbar, Alert 
} from "@mui/material";
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

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false); 

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  const handleDeleteInitiate = (id: string) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      setIsDeleting(true); 
      try {
        await dispatch(deleteProduct(deleteId)).unwrap();
        setDeleteId(null);
        setShowDeleteSuccess(true); 
      } catch (error) {
        console.error("Delete failed:", error);
      } finally {
        setIsDeleting(false); 
      }
    }
  };

  if (loading && sellerProducts.length === 0) return <Loading />;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f8f9fa", minHeight: "100vh" }}>
  
      <Snackbar 
        open={showDeleteSuccess} 
        autoHideDuration={3000} 
        onClose={() => setShowDeleteSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="info" sx={{ width: '100%', fontWeight: 700, borderRadius: 2 }}>
          Product successfully removed from inventory.
        </Alert>
      </Snackbar>

      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
        <Box>
          <Breadcrumbs sx={{ mb: 1, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
            <Link underline="hover" color="inherit" onClick={() => navigate("/seller/dashboard")} sx={{ cursor: 'pointer' }}>
              Dashboard
            </Link>
            <Typography color="primary" sx={{ fontSize: "0.75rem", fontWeight: 700 }}>
              Inventory Management
            </Typography>
          </Breadcrumbs>
          <Typography variant="h4" fontWeight="900" sx={{ letterSpacing: -1 }}>
            Product Inventory
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage your curated collection of <strong>{sellerProducts.length}</strong> architectural pieces.
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
            fontSize: "0.8rem",
            '&:hover': { bgcolor: "#003580" }
          }}
        >
          Add New Product
        </Button>
      </Stack>

      <InventoryStats products={sellerProducts} />

      <Box sx={{ mt: 4 }}>
        <InventoryTable 
          products={sellerProducts} 
          onDelete={handleDeleteInitiate} 
          onEdit={(id) => navigate(`/seller/edit-product/${id}`)} 
        />
      </Box>

      <Dialog 
        open={Boolean(deleteId)} 
        onClose={() => !isDeleting && setDeleteId(null)} 
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 900, pb: 1 }}>
          Remove from Inventory?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to delete this architectural piece? This action is permanent and will remove the product from the marketplace.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button 
            onClick={() => setDeleteId(null)} 
            disabled={isDeleting}
            sx={{ fontWeight: 700, color: "text.secondary" }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            variant="contained" 
            color="error" 
            disabled={isDeleting}
            sx={{ 
              fontWeight: 800, 
              px: 3, 
              minWidth: 100,
              bgcolor: isDeleting ? "error.light" : "error.main"
            }}
          >
            {isDeleting ? <CircularProgress size={20} color="inherit" /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryManagement;