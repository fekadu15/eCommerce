import { Stack, Box, Tooltip } from "@mui/material";

interface OrderProductRowProps {
  items: Array<{
    product: {
      image: string;
      name: string;
    };
  }>;
}

const OrderProductRow = ({ items }: OrderProductRowProps) => {
  return (
    <Stack 
      direction="row" 
      spacing={2} 
      sx={{ 
        overflowX: "auto", 
        pb: 1,
        "&::-webkit-scrollbar": { height: 6 },
        "&::-webkit-scrollbar-thumb": { backgroundColor: "#eee", borderRadius: 10 }
      }}
    >
      {items.map((item, idx) => (
        <Tooltip key={idx} title={item.product?.name || "Product"}>
          <Box 
            component="img"
            src={item.product?.image || '/placeholder-image.png'}
            alt={item.product?.name}
            sx={{ 
              width: 80, height: 80, objectFit: 'contain', 
              bgcolor: '#fff', border: '1px solid #f0f0f0', 
              p: 1, borderRadius: 1, flexShrink: 0 
            }}
          />
        </Tooltip>
      ))}
    </Stack>
  );
};

export default OrderProductRow;