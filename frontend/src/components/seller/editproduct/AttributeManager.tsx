import { Stack, Chip, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

const AttributeManager = () => {
  const attributes = ["Limited Edition", "Solid Ash", "Hand-crafted"];

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {attributes.map((attr) => (
        <Chip 
          key={attr} 
          label={attr} 
          onDelete={() => {}} 
          sx={{ bgcolor: "#eff6ff", color: "#1e40af", fontWeight: 800, borderRadius: 1.5, fontSize: "0.75rem" }} 
        />
      ))}
      <Button 
        size="small" 
        startIcon={<Add />} 
        sx={{ textTransform: "none", fontWeight: 800, fontSize: "0.75rem", color: "text.secondary", border: "1px dashed #ccc", px: 1.5, borderRadius: 1.5 }}
      >
        Add Attribute
      </Button>
    </Stack>
  );
};

export default AttributeManager;