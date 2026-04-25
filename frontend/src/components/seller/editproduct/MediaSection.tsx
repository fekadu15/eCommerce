import React, { useRef } from "react";
import { Paper, Box, Typography, Button, Stack, FormHelperText } from "@mui/material";

interface MediaSectionProps {
  image: string;
  onImageChange: (base64: string) => void;
  error?: string;
}

const MediaSection = ({ image, onImageChange, error }: MediaSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReplaceClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Stack spacing={3}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: 3, 
          border: error ? "1px solid #d32f2f" : "1px solid #eee", 
          transition: "border 0.2s ease-in-out"
        }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="caption" fontWeight="800" color={error ? "#d32f2f" : "text.secondary"}>
            PRIMARY VISUAL {error && "— REQUIRED"}
          </Typography>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />

          <Button 
            size="small" 
            onClick={handleReplaceClick}
            sx={{ 
              fontSize: "0.7rem", 
              fontWeight: 800, 
              textTransform: "none",
              color: "#0047ab"
            }}
          >
            Replace Image
          </Button>
        </Stack>

        <Box 
          sx={{ 
            width: "100%", 
            height: 380, 
            borderRadius: 2, 
            bgcolor: "#1a1a1a", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            overflow: "hidden", 
            position: 'relative',
            border: error ? "2px solid #d32f2f" : "none" 
          }}
        >
          {image ? (
            <Box 
              component="img" 
              src={image} 
              alt="Product Preview"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          ) : (
            <Typography color="grey.800" fontWeight="900" variant="h5">
              Architectural Visual
            </Typography>
          )}
        </Box>

        {error && (
          <FormHelperText error sx={{ fontWeight: 800, mt: 1, fontSize: "0.75rem" }}>
            {error}
          </FormHelperText>
        )}

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Box 
            sx={{ 
              width: 70, 
              height: 70, 
              borderRadius: 1.5, 
              bgcolor: "#eee", 
              border: image ? "3px solid #0047ab" : "1px solid #eee", 
              overflow: 'hidden' 
            }}
          >
            {image && (
              <Box 
                component="img" 
                src={image} 
                sx={{ width: '100%', height: '100%', objectFit: 'cover'}} 
              />
            )}
          </Box>

          {[1, 2].map((i) => (
            <Box 
              key={i} 
              onClick={handleReplaceClick}
              sx={{ 
                width: 70, 
                height: 70, 
                borderRadius: 1.5, 
                border: '2px dashed #ccc', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#ccc',
                cursor: 'pointer',
                transition: '0.2s',
                "&:hover": { bgcolor: "#f1f5f9", borderColor: "#0047ab", color: "#0047ab" }
              }}
            >
              +
            </Box>
          ))}
        </Stack>
      </Paper>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          borderRadius: 3, 
          border: "1px solid #eee", 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}
      >
        <Stack>
          <Typography variant="caption" fontWeight="800" color="text.secondary">
            PRODUCT VISIBILITY
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#10b981" }} />
            <Typography variant="body2" fontWeight="800">
              Active on Marketplace
            </Typography>
          </Stack>
        </Stack>
        <Button 
          variant="contained" 
          size="small" 
          sx={{ 
            bgcolor: "#f1f5f9", 
            color: "black", 
            fontWeight: 900, 
            fontSize: "0.6rem", 
            px: 2, 
            borderRadius: 1.5, 
            boxShadow: "none",
            "&:hover": { bgcolor: "#e2e8f0", boxShadow: "none" } 
          }}
        >
          CHANGE
        </Button>
      </Paper>
    </Stack>
  );
};

export default MediaSection;