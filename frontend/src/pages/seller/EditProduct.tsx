import { useEffect, useState } from "react";
import { 
  Box, Typography, Stack, Button, Grid2 as Grid, 
  CircularProgress, Snackbar, Alert 
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, updateProduct, createNewProduct } from "../../features/product/productSlice"; 
import type { AppDispatch, RootState } from "../../app/store";
import type { Product } from "../../types/product"; 

import MediaSection from "../../components/seller/editproduct/MediaSection";
import DetailsForm from "../../components/seller/editproduct/DetailsForm";
import LogisticsSection from "../../components/seller/editproduct/LogisticsSection";

const initialFormState = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  image: "",
  category: "Seating",
  sku: ""
};

type FormErrors = Partial<Record<keyof typeof initialFormState, string>>;

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { product } = useSelector((state: RootState) => state.products);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (product && id) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        stock: product.stock || 0,
        image: product.image || "",
        category: product.category || "Seating",
        sku: product.sku || `ARCH-CH-00${id.slice(-2)}` 
      });
    }
  }, [product, id]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Architectural name is required";
    if (!formData.description.trim()) newErrors.description = "Detailed description is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (formData.stock < 0) newErrors.stock = "Stock cannot be negative";
    if (!formData.image) newErrors.image = "Product image is mandatory";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setIsSubmitting(true); 
    try {
      if (id) {
        await dispatch(updateProduct({ id, data: formData as Partial<Product> })).unwrap();
      } else {
        await dispatch(createNewProduct(formData as Partial<Product>)).unwrap();
      }
      
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/seller/inventory");
      }, 1500);

    } catch (err) {
      console.error("Failed to save product:", err);
      setIsSubmitting(false); 
    }
  };

  const handleInputChange = (field: keyof typeof initialFormState, val: string | number) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f8f9fa", minHeight: "100vh", width: "100%", boxSizing: "border-box", overflowX: "hidden" }}>
      
      <Snackbar 
        open={showSuccess} 
        autoHideDuration={3000} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%', fontWeight: 700, borderRadius: 2 }}>
          Changes saved successfully. Redirecting to inventory...
        </Alert>
      </Snackbar>

      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="caption" fontWeight="800" color="#b45309" sx={{ textTransform: "uppercase", letterSpacing: 1 }}>
            Curator Dashboard
          </Typography>
          <Typography variant="h4" fontWeight="900" sx={{ mt: 0.5, letterSpacing: -1 }}>
            {id ? "Edit Product Details" : "Create New Product"}
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button 
            variant="text" 
            sx={{ color: "text.secondary", fontWeight: 700 }} 
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Discard
          </Button>
          <Button 
            variant="contained" 
            disabled={isSubmitting}
            sx={{ 
              bgcolor: "#0047ab", 
              fontWeight: 800, 
              px: 4, 
              py: 1.2, 
              borderRadius: 2,
              minWidth: 150 
            }} 
            onClick={handleSave}
          >
            {isSubmitting ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Save Changes"}
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ overflow: "hidden" }}> 
        <Grid container spacing={3}>
        
          <Grid size={{ xs: 12, md: 5 }}>
            <MediaSection 
              image={formData.image} 
              onImageChange={(val: string) => handleInputChange("image", val)} 
              error={errors.image}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              <DetailsForm 
                data={formData} 
                errors={errors}
                onChange={handleInputChange} 
              />
              <LogisticsSection 
                stock={formData.stock} 
                sku={formData.sku}
                error={errors.stock}
                onStockChange={(val: number) => handleInputChange("stock", val)} 
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EditProduct;