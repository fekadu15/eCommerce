import { Card, Typography, Rating, Avatar, Stack, Box } from "@mui/material";
import type { Review } from "../../types/product";

interface Props {
  review: Review;
}

const ReviewCard = ({ review }: Props) => {
  return (
    <Card variant="outlined" sx={{ p: 3, height: '100%', border: 'none', bgcolor: '#fbfbfb' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: '#0052cc' }}>{review.name[0]}</Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">{review.name}</Typography>
            <Typography variant="caption" color="text.secondary">Verified Buyer</Typography>
          </Box>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {new Date(review.createdAt).toLocaleDateString()}
        </Typography>
      </Stack>
      <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
  {review.comment.slice(0, 60)}
</Typography>
      <Typography variant="body2" color="text.secondary">{review.comment}</Typography>
    </Card>
  );
};

export default ReviewCard;