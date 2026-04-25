import { Box, Typography, Rating, Avatar, Stack } from "@mui/material";
import type { Review } from "../../../types/product";
import { formatDistanceToNow } from "date-fns";

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <Box 
      sx={{ 
        p: 3, 
        bgcolor: "#ffffff", 
        borderRadius: 2, 
        border: "1px solid #f0f0f0",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar 
            sx={{ 
              bgcolor: "#e0f2fe", 
              color: "#0369a1", 
              fontSize: "0.875rem", 
              fontWeight: 900 
            }}
          >
            {review.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight="900">
              {review.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: -0.5 }}>
              Verified Buyer
            </Typography>
          </Box>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {formatDistanceToNow(new Date(review.createdAt))} ago
        </Typography>
      </Stack>

      <Rating 
        value={review.rating} 
        readOnly 
        size="small" 
        sx={{ mb: 1.5, color: "#000" }} 
      />
      
      <Typography variant="body2" fontWeight="900" gutterBottom sx={{ textTransform: 'capitalize' }}>
        {review.title}
      </Typography>
      
      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>
        {review.comment}
      </Typography>
    </Box>
  );
};

export default ReviewCard;