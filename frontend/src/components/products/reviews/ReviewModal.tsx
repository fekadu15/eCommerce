import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Rating, TextField, Button, Stack, Typography, IconButton , Box
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import type { CreateReviewBody } from "../../../types/product";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateReviewBody) => void;
  loading: boolean;
}

const ReviewModal = ({ open, onClose, onSubmit, loading }: ReviewModalProps) => {
  const [rating, setRating] = useState<number | null>(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const handleFormSubmit = () => {
    if (rating && title && comment) {
      onSubmit({ rating, title, comment });
      // Reset form
      setTitle("");
      setComment("");
      setRating(5);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
      <DialogTitle sx={{ fontWeight: 900, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Write a Review
        <IconButton onClick={onClose} size="small"><Close /></IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Box>
            <Typography variant="caption" fontWeight="900" color="text.secondary" gutterBottom>
              OVERALL RATING
            </Typography>
            <Rating value={rating} onChange={(_, val) => setRating(val)} size="large" sx={{ color: '#000', display: 'flex' }} />
          </Box>

          <TextField
            label="Review Headline"
            placeholder="e.g. Simply Architectural"
            fullWidth
            variant="filled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{ disableUnderline: true, sx: { borderRadius: 2 } }}
          />

          <TextField
            label="Your Experience"
            placeholder="What did you like or dislike?"
            multiline
            rows={4}
            fullWidth
            variant="filled"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            InputProps={{ disableUnderline: true, sx: { borderRadius: 2 } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button 
          fullWidth
          variant="contained" 
          onClick={handleFormSubmit}
          disabled={loading || !comment || !title}
          sx={{ bgcolor: "#000", py: 1.5, borderRadius: 2, fontWeight: 900, "&:hover": { bgcolor: "#333" } }}
        >
          {loading ? "Posting..." : "Post Review"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewModal;