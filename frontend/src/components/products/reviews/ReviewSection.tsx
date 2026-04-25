import { Box, Typography, Stack,  } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type{ Product, CreateReviewBody } from "../../../types/product";
import { createReview } from "../../../features/product/productSlice";
import type{ AppDispatch, RootState } from "../../../app/store";
import ReviewCard from "./ReviewCard";
import ReviewModal from "./ReviewModal";

interface ReviewSectionProps {
  product: Product;
}

const ReviewSection = ({ product }: ReviewSectionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.products);
  const [modalOpen, setModalOpen] = useState(false);

  const handleReviewSubmit = async (reviewData: CreateReviewBody) => {
    await dispatch(createReview({ productId: product._id, reviewData }));
    setModalOpen(false);
  };

  return (
    <Box sx={{ mt: 10 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h5" fontWeight="900">
            Customer Reviews
          </Typography>
          <Typography variant="h6" fontWeight="900" color="primary">
            {product.rating.toFixed(1)}
          </Typography>
        </Stack>

        <Typography
          onClick={() => setModalOpen(true)}
          variant="subtitle2"
          fontWeight="900"
          sx={{ cursor: "pointer", textDecoration: "underline", color: "#000" }}
        >
          WRITE A REVIEW
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <Grid size={{ xs: 12, md: 4 }} key={review._id}>
              <ReviewCard review={review} />
            </Grid>
          ))
        ) : (
          <Grid size={12}>
            <Typography color="text.secondary">No reviews yet. Be the first to share your thoughts!</Typography>
          </Grid>
        )}
      </Grid>

      <ReviewModal 
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleReviewSubmit}
        loading={loading}
      />
    </Box>
  );
};

export default ReviewSection;