import { useEffect, useState } from "react";
import { Box, Typography, Stack, Button, Grid2 as Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, updateProduct, createNewProduct } from "../../features/product/productSlice"; 
import type { AppDispatch, RootState } from "../../app/store";

import MediaSection from "../../components/seller/editproduct/MediaSection";
import DetailsForm from "../../components/seller/editproduct/DetailsForm";
import LogisticsSection from "../../components/seller/editproduct/LogisticsSection";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { product } = useSelector((state: RootState) => state.products);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
    category: "",
    sku: ""
  });

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (product && id) {
      const p = product as any; 
      setFormData({
        name: p.name || "",
        description: p.description || "",
        price: p.price || 0,
        stock: p.stock || 0,
        image: p.image || "",
        category: p.category || "Seating",
        sku: p.sku || `ARCH-CH-00${id.slice(-2)}` 
      });
    }
  }, [product, id]);

  const handleSave = async () => {
    try {
      if (id) {
        await dispatch(updateProduct({ id, data: formData })).unwrap();
      } else {
        await dispatch(createNewProduct(formData)).unwrap();
      }
      navigate("/seller/inventory");
    } catch (err) {
      console.error("Failed to save product:", err);
    }
  };

  return (
    <Box sx={{ 
      p: 4, 
      bgcolor: "#f8f9fa", 
      minHeight: "100vh", 
      width: "100%", 
      boxSizing: "border-box",
      overflowX: "hidden"
    }}>
      
 
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="caption" fontWeight="800" color="#b45309" sx={{ textTransform: "uppercase", letterSpacing: 1 }}>
            Curator Dashboard
          </Typography>
          <Typography variant="h4" fontWeight="900" sx={{ mt: 0.5, letterSpacing: -1 }}>
            Edit Product Details
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button variant="text" sx={{ color: "text.secondary", fontWeight: 700 }} onClick={() => navigate(-1)}>
            Discard Changes
          </Button>
          <Button 
            variant="contained" 
            sx={{ bgcolor: "#0047ab", fontWeight: 800, px: 4, py: 1.2, borderRadius: 2 }} 
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ overflow: "hidden" }}> 
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <MediaSection 
              image={formData.image} 
              onImageChange={(val: string) => setFormData({ ...formData, image: val })} 
            />
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              <DetailsForm 
                data={formData} 
                onChange={(field: string, val: any) => setFormData({ ...formData, [field]: val })} 
              />
              <LogisticsSection 
                stock={formData.stock} 
                sku={formData.sku}
                onStockChange={(val: number) => setFormData({ ...formData, stock: val })} 
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EditProduct;